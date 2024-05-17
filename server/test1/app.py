from flask import Flask, request, jsonify, render_template, redirect
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

def get_db_connection():
    db = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='co_wiki', charset='utf8')
    return db

@app.route('/')
def hello():
    return render_template('hello.html')

@app.route('/api/get_name', methods=['POST'])
def get_name():
    try:
        # 클라이언트에서 JSON 형식으로 전송한 데이터를 추출
        data = request.get_json()   
        id = data.get('email')
        password = data.get('password')

        # 데이터베이스 연결 및 커서 생성
        db = get_db_connection()
        cursor = db.cursor()

        # 사용자를 찾는 쿼리 실행
        sql = "SELECT name FROM login WHERE id = %s AND password = %s"
        cursor.execute(sql, (id, password))
        result = cursor.fetchone()

        # 커서 및 연결 닫기
        cursor.close()
        db.close()

        if result:
            name = result[0]
        else:
            name = None

        return jsonify({'name': name})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/create/', methods=['POST'])
def create():
    try:
        # 클라이언트에서 JSON 형식으로 전송한 데이터를 추출
        data = request.get_json()
        id = data.get('id')
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        name = data.get('name')

        if password != confirm_password:
            return jsonify({'error': '비밀번호가 일치하지 않습니다'}), 400

        # 데이터베이스 연결 및 커서 생성
        db = get_db_connection()
        cursor = db.cursor()

        # MySQL 쿼리 실행
        sql = "INSERT INTO login (id, password, name) VALUES (%s, %s, %s)"
        cursor.execute(sql, (id, password, name))
        db.commit()

        # 커서 및 연결 닫기
        cursor.close()
        db.close()

        return redirect("http://localhost:3000/login")

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/check_username/<username>', methods=['GET'])
def check_username(username):
    try:
        # 데이터베이스 연결 및 커서 생성
        db = get_db_connection()
        cursor = db.cursor()

        # 데이터베이스에서 입력받은 아이디가 이미 사용 중인지 확인
        sql = "SELECT id FROM login WHERE id = %s"
        cursor.execute(sql, (username,))
        result = cursor.fetchone()

        # 커서 및 연결 닫기
        cursor.close()
        db.close()

        # 결과를 JSON 형태로 반환
        is_taken = result is not None
        return jsonify({'isTaken': is_taken})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
