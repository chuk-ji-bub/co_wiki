from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
import pymysql
from authlib.integrations.flask_client import OAuth
import os
from google.oauth2 import id_token
from google.auth.transport import requests
import openai
from dotenv import load_dotenv
from openai.error import OpenAIError, RateLimitError

# .env 파일 로드 및 환경 변수 가져오기
load_dotenv()

# 환경 변수 가져오기
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

if not (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET and OPENAI_API_KEY):
    raise ValueError("환경 변수가 올바르게 설정되지 않았습니다.")

# Flask 앱 초기화 및 설정
app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# OpenAI API 키 설정
openai.api_key = OPENAI_API_KEY

# Google OAuth 설정
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    redirect_uri='http://localhost:3000/login',
    client_kwargs={'scope': 'openid profile email'}
)

# DB 연결 함수
def get_db_connection():
    return pymysql.connect(
        host='127.0.0.1', user='root', password='1234', 
        db='co_wiki', charset='utf8', cursorclass=pymysql.cursors.DictCursor
    )

# 관리자 여부 확인 함수
def is_admin(email):
    """데이터베이스에서 주어진 이메일이 관리자 목록에 있는지 확인"""
    db = get_db_connection()
    cursor = db.cursor()
    print(f"[is_admin] Checking admin status for email: {email}")  # 로그 추가
    cursor.execute("SELECT 1 FROM admin_users WHERE email = %s", (email,))
    result = cursor.fetchone()
    cursor.close()
    db.close()
    is_admin_status = result is not None
    print(f"[is_admin] Admin status for {email}: {is_admin_status}")  # 결과 로그
    return is_admin_status

# CORS 프리플라이트 응답
def _build_cors_preflight_response():
    response = jsonify({'message': 'Preflight OK'})
    response.status_code = 200
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return response

# 관리자 여부 확인 함수
def is_admin(email):
    """데이터베이스에서 주어진 이메일이 관리자 목록에 있는지 확인"""
    db = get_db_connection()
    cursor = db.cursor()
    
    # DB 확인 시작 로그
    print(f"[is_admin] Checking admin status for email: {email}")
    cursor.execute("SELECT 1 FROM admin_users WHERE email = %s", (email,))
    result = cursor.fetchone()
    
    # 결과 출력 로그
    is_admin = result is not None
    print(f"[is_admin] Admin status for {email}: {is_admin}")
    
    cursor.close()
    db.close()
    return is_admin

# Google 로그인 엔드포인트
@app.route('/api/google_login', methods=['POST', 'OPTIONS'])
def google_login():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    try:
        token = request.json.get('token')
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), GOOGLE_CLIENT_ID
        )

        # 사용자 정보 추출 및 세션 저장
        userid = idinfo['sub']
        email = idinfo.get('email')
        name = idinfo.get('name')

        session['user_id'] = userid
        session['email'] = email
        session['name'] = name
        session['is_admin'] = is_admin(email)  # DB에서 관리자 여부 확인

        # 로그인 결과 출력
        print(f"[google_login] User {name} logged in with email: {email}")
        print(f"[google_login] Admin status: {session['is_admin']}")

        return jsonify({
            'success': True,
            'token': token,
            'name': name,
            'is_admin': session['is_admin'],  # 프론트엔드로 관리자 여부 전달
            'message': f"{name}님 환영합니다!"
        })

    except ValueError as e:
        return jsonify({'success': False, 'error': f"Invalid token: {e}"}), 400
    except Exception as e:
        return jsonify({'success': False, 'error': f"Server error: {e}"}), 500


# 관리자 권한 확인 데코레이터
def admin_required(f):
    def wrapper(*args, **kwargs):
        if not session.get('is_admin'):
            return jsonify({"error": "Unauthorized access"}), 403
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# 프로그램 함수 가져오기
@app.route('/api/functions', methods=['GET'])
def get_functions():
    language = request.args.get('language')
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id, language, function_name, usage_example, description FROM programming_concepts WHERE language = %s",
        (language,)
    )
    functions = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(functions)

# 새로운 함수 추가 (관리자 전용)
@app.route('/api/functions', methods=['POST'])
@admin_required
def add_function():
    data = request.json

    # 데이터 검증
    required_fields = ['language', 'function_name', 'usage_example', 'description']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field} is required"}), 400

    db = get_db_connection()
    cursor = db.cursor()
    try:
        cursor.execute(
            "INSERT INTO programming_concepts (language, function_name, usage_example, description) VALUES (%s, %s, %s, %s)",
            (data['language'], data['function_name'], data['usage_example'], data['description'])
        )
        db.commit()
        new_id = cursor.lastrowid
        return jsonify({"message": "Function added successfully!", "id": new_id})
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        db.close()

# 함수 삭제 (관리자 전용)
@app.route('/api/functions/<int:id>', methods=['DELETE'])
@admin_required
def delete_function(id):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM programming_concepts WHERE id = %s", (id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Function deleted successfully"})

# 함수 업데이트 (관리자 전용)
@app.route('/api/functions/<int:id>', methods=['PUT'])
@admin_required
def update_function(id):
    data = request.json
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute(
        "UPDATE programming_concepts SET language=%s, function_name=%s, usage_example=%s, description=%s WHERE id=%s",
        (data['language'], data['function_name'], data['usage_example'], data['description'], id)
    )
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Function updated successfully"})

# 고유한 언어 목록 가져오기
@app.route('/api/languages', methods=['GET'])
def get_languages():
    db = get_db_connection()
    cursor = db.cursor()
    
    try:
        cursor.execute("SELECT DISTINCT language FROM programming_concepts")
        languages = [row['language'] for row in cursor.fetchall()]
        return jsonify(languages)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        cursor.close()
        db.close()

#챗봇 엔드포인트
@app.route('/api/chatbot', methods=['POST', 'OPTIONS'])
def chatbot():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    try:
        user_message = request.json.get("message", "")
        print(f"[chatbot] Received message: {user_message}")

        # DB에서 찾은 정보를 OpenAI 프롬프트에 추가
        keyword = user_message.lower().split()[0]  # 예시로 첫 단어를 키워드로 사용
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(
            """
            SELECT function_name, usage_example, description
            FROM programming_concepts
            WHERE function_name = %s
            """, (keyword,)
        )
        result = cursor.fetchone()
        cursor.close()
        db.close()

        additional_info = ""
        if result:
            additional_info = (
                f"{result['function_name']} 함수 예제: {result['usage_example']}\n"
                f"{result['description']}\n"
            )

        # 한국어로 답변하도록 지시
        prompt = (
            "너는 프로그래밍 정보가 포함된 도움이 되는 한국어 어시스턴트야.\n"
            f"사용자 질문: {user_message}\n"
            f"추가 정보: {additional_info}\n"
            "위 질문에 대한 답변을 한국어로 상세히 제공해줘."
        )

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        )

        reply = response.choices[0].message["content"].strip()
        print(f"[chatbot] AI response: {reply}")

        return jsonify({"reply": reply})

    except RateLimitError as e:
        print(f"[chatbot] OpenAI API Rate Limit Error: {e}")
        return jsonify({"error": "OpenAI API 할당량을 초과했습니다. 계정 사용량을 확인하세요."}), 429

    except OpenAIError as e:
        print(f"[chatbot] OpenAI API Error: {e}")
        return jsonify({"error": f"OpenAI API 오류: {e}"}), 500

    except Exception as e:
        print(f"[chatbot] Server Error: {e}")
        return jsonify({"error": f"서버 오류: {e}"}), 500



# 특정 함수 정보를 DB에서 검색하여 가져오는 엔드포인트
@app.route('/api/function_info', methods=['GET'])
def get_function_info():
    function_name = request.args.get('function_name')
    db = get_db_connection()
    cursor = db.cursor()
    
    cursor.execute(
        "SELECT function_name, usage_example, description FROM programming_concepts WHERE function_name = %s",
        (function_name,)
    )
    function_info = cursor.fetchone()
    cursor.close()
    db.close()

    if function_info:
        return jsonify(function_info)
    else:
        return jsonify({"error": "Function not found"}), 404
    

# 루트 페이지 접근 제어
@app.route('/root', methods=['GET'])
@admin_required
def root_page():
    return jsonify({"message": f"Welcome {session.get('name', 'User')}!"})

# 로그아웃
@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"})

if __name__ == '__main__':
    app.run(debug=True)
