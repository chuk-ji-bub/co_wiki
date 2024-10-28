<<<<<<< Updated upstream
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pymysql
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def get_db_connection():
    db = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='co_wiki', charset='utf8')
    return db

@app.route('/api/search', methods=['GET'])
def search():
    term = request.args.get('term', '')
    db = get_db_connection()
    cursor = db.cursor()
    sql = "SELECT definition FROM dictionary WHERE term = %s"
    cursor.execute(sql, (term,))
    result = cursor.fetchone()
    cursor.close()
    db.close()
    
    if result:
        definition = result[0]
    else:
        definition = '정의가 없습니다.'

    return jsonify({'term': term, 'definition': definition})

@app.route('/api/get_name', methods=['POST'])
def get_name():
    try:
        data = request.get_json()
        id = data.get('email')
        password = data.get('password')

        db = get_db_connection()
        cursor = db.cursor()

        sql = "SELECT name, 직업 FROM login WHERE id = %s AND password = %s"
        cursor.execute(sql, (id, password))
        result = cursor.fetchone()

        cursor.close()
        db.close()

        if result:
            name = result[0]
            role = result[1]
        else:
            name = None
            role = None

        return jsonify({'name': name, 'role': role})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/create/', methods=['POST'])
def create():
    try:
        data = request.get_json()
        id = data.get('id')
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        name = data.get('name')
        role = data.get('role')
        professor_code = data.get('professorCode', '')

        if password != confirm_password:
            return jsonify({'error': '비밀번호가 일치하지 않습니다'}), 400

        if role == '교수' and professor_code != '1234':
            return jsonify({'error': '코드를 확인해주세요.'}), 400

        db = get_db_connection()
        cursor = db.cursor()

        sql = "INSERT INTO login (id, password, name, 직업) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (id, password, name, role))
        db.commit()

        cursor.close()
        db.close()

        return jsonify({'message': '회원가입 되셨습니다.', 'redirect': '/login'})

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/check_username/<username>', methods=['GET'])
def check_username(username):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        sql = "SELECT id FROM login WHERE id = %s"
        cursor.execute(sql, (username,))
        result = cursor.fetchone()

        cursor.close()
        db.close()

        is_taken = result is not None
        return jsonify({'isTaken': is_taken})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/dictionary', methods=['GET'])
def get_terms():
    db = get_db_connection()
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT kr, en, definition FROM dictionary")
    terms = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(terms)

@app.route('/api/dictionary', methods=['POST'])
def add_term():
    data = request.get_json()
    kr = data.get('kr')
    en = data.get('en')
    definition = data.get('definition')

    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("INSERT INTO dictionary (kr, en, definition) VALUES (%s, %s, %s)", (kr, en, definition))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'id': cursor.lastrowid, 'kr': kr, 'en': en, 'definition': definition})

@app.route('/api/dictionary/<int:id>', methods=['DELETE'])
def delete_term(id):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM dictionary WHERE id = %s", (id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Term deleted successfully'})

@app.route('/api/upload_profile', methods=['POST'])
def upload_profile():
    file = request.files['file']
    user_id = request.form.get('user_id')
    
    if file:
        filename = f"{user_id}_{file.filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        db = get_db_connection()
        cursor = db.cursor()
        sql = "UPDATE login SET profile_image = %s WHERE id = %s"
        cursor.execute(sql, (filename, user_id))
        db.commit()
        cursor.close()
        db.close()

        return jsonify({'message': 'Profile image uploaded successfully', 'filepath': filepath})
    return jsonify({'error': 'File upload failed'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/change_password', methods=['POST'])
def change_password():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT password FROM login WHERE id = %s", (user_id,))
        result = cursor.fetchone()

        if result and result[0] == old_password:
            cursor.execute("UPDATE login SET password = %s WHERE id = %s", (new_password, user_id))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': '비밀번호가 변경되었습니다.'}), 200
        else:
            cursor.close()
            db.close()
            return jsonify({'error': '현재 비밀번호가 일치하지 않습니다.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
=======
from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
import pymysql
from authlib.integrations.flask_client import OAuth
import os
from google.oauth2 import id_token
from google.auth.transport import requests
import openai
from dotenv import load_dotenv

app = Flask(__name__)
app.secret_key = os.urandom(24)  # 세션 암호화 키 설정
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# .env 파일 로드
load_dotenv()

# 환경 변수에서 API 키 및 클라이언트 정보 가져오기
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

if not (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET and OPENAI_API_KEY):
    raise ValueError("환경 변수가 올바르게 설정되지 않았습니다.")

openai.api_key = OPENAI_API_KEY

# OAuth 설정
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri='http://localhost:3000/login',
    client_kwargs={'scope': 'openid profile email'}
)

# 교수 권한 이메일 설정
PROFESSOR_EMAILS = ["zxcv828133@gmail.com"]

def get_db_connection():
    return pymysql.connect(
        host='127.0.0.1', user='root', password='1234', 
        db='co_wiki', charset='utf8'
    )

# Google OAuth 로그인 처리
@app.route('/api/google_login', methods=['POST', 'OPTIONS'])
def google_login():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    try:
        token = request.json.get('token')
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), 
            "709327209190-g4veopnsbj84rf4nuoud57elbtlbfnsd.apps.googleusercontent.com"
        )

        userid = idinfo['sub']
        email = idinfo.get('email')
        name = idinfo.get('name')

        is_professor = email in PROFESSOR_EMAILS

        session.update({
            'user_id': userid,
            'email': email,
            'name': name,
            'is_professor': is_professor
        })

        return jsonify({
            'success': True, 'token': token,
            'name': name, 'message': f"{name}님 환영합니다!"
        })

    except ValueError as e:
        return jsonify({'success': False, 'error': f'Invalid token: {str(e)}'}), 400

def _build_cors_preflight_response():
    response = jsonify({'message': 'Preflight OK'})
    response.headers.update({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    })
    return response

# 챗봇 엔드포인트
@app.route('/api/chatbot', methods=['POST', 'OPTIONS'])
def chatbot():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    try:
        # 클라이언트로부터 메시지를 가져옴
        user_message = request.json.get("message", "")

        if not user_message:
            raise ValueError("메시지가 비어 있습니다.")

        # OpenAI GPT 모델 호출
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
        print(f"OpenAI API 오류: {str(e)}")
        return jsonify({"error": f"OpenAI API 오류: {str(e)}"}), 500

    except ValueError as e:
        print(f"잘못된 입력 오류: {str(e)}")
        return jsonify({"error": f"잘못된 입력 오류: {str(e)}"}), 400

    except Exception as e:
        print(f"서버 오류: {str(e)}")
        return jsonify({"error": f"서버 오류: {str(e)}"}), 500
    


# 프로그래밍 함수 가져오기
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

# 루트 페이지 접근 제어
@app.route('/root', methods=['GET'])
def root_page():
    if 'email' not in session:
        return redirect('/login')
    if session.get('is_professor'):
        return jsonify({"message": f"Welcome, professor {session['name']}!"})
    return jsonify({"error": "Unauthorized access"}), 403

# 로그아웃
@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"})
>>>>>>> Stashed changes

if __name__ == '__main__':
    app.run(debug=True)
