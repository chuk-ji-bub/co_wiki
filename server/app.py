from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
import pymysql
from authlib.integrations.flask_client import OAuth
import os
from google.oauth2 import id_token
from google.auth.transport import requests
import openai
from dotenv import load_dotenv

# .env 파일 로드 및 환경 변수 가져오기
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

if not (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET and OPENAI_API_KEY):
    raise ValueError("환경 변수가 올바르게 설정되지 않았습니다.")

# Flask 앱 초기화
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
        db='co_wiki', charset='utf8'
    )

# CORS 프리플라이트 응답
def _build_cors_preflight_response():
    response = jsonify({'message': 'Preflight OK'})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return response

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

        return jsonify({
            'success': True,
            'token': token,
            'name': name,
            'message': f"{name}님 환영합니다!"
        })

    except ValueError as e:
        return jsonify({'success': False, 'error': f"Invalid token: {e}"}), 400
    except Exception as e:
        return jsonify({'success': False, 'error': f"Server error: {e}"}), 500

# 챗봇 엔드포인트
@app.route('/api/chatbot', methods=['POST', 'OPTIONS'])
def chatbot():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    try:
        user_message = request.json.get("message", "")
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message},
            ]
        )
        reply = response.choices[0].message["content"].strip()
        return jsonify({"reply": reply})

    except openai.error.OpenAIError as e:
        return jsonify({"error": f"OpenAI API 오류: {e}"}), 500
    except Exception as e:
        return jsonify({"error": f"서버 오류: {e}"}), 500

# 프로그램 함수 가져오기
@app.route('/api/functions', methods=['GET'])
def get_functions():
    language = request.args.get('language')
    db = get_db_connection()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    cursor.execute(
        "SELECT id, language, function_name, usage_example, description FROM programming_concepts WHERE language = %s",
        (language,)
    )
    functions = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(functions)

# 새로운 함수 추가
@app.route('/api/functions', methods=['POST'])
def add_function():
    data = request.json
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO programming_concepts (language, function_name, usage_example, description) VALUES (%s, %s, %s, %s)",
        (data['language'], data['function_name'], data['usage_example'], data['description'])
    )
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Function added successfully!"})

# 함수 삭제
@app.route('/api/functions/<int:id>', methods=['DELETE'])
def delete_function(id):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM programming_concepts WHERE id = %s", (id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Function deleted successfully"})

# 함수 업데이트
@app.route('/api/functions/<int:id>', methods=['PUT'])
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

# 루트 페이지 접근 제어
@app.route('/root', methods=['GET'])
def root_page():
    if 'email' not in session:
        return redirect('/login')
    return jsonify({"message": f"Welcome {session.get('name', 'User')}!"})

# 로그아웃
@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"})

if __name__ == '__main__':
    app.run(debug=True)
