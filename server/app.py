from flask import *
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# MySQL 연결 설정
db = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='co_wiki', charset='utf8')
cursor = db.cursor()

@app.route('/')
def hello():
    return render_template('hello.html')

@app.route('/api/get_name', methods=['POST'])
def get_name():
    try:
        data = request.get_json()
        username = data.get('username')  # 'email' -> 'username'로 수정
        password = data.get('password')

        sql = "SELECT name from login WHERE id = %s AND password = %s"
        cursor.execute(sql, (username, password))
        result = cursor.fetchone()

        if result:
            name = result[0]
        else:
            name = None

        return jsonify({'name': name})

    except Exception as e:
        return jsonify({'error': str(e)})



@app.route('/api/create/', methods=['POST'])
def create():
    id = request.form.get('id')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')
    name = request.form.get('name')

    # 중복된 id가 있는지 확인
    sql_check_id = "SELECT id FROM login WHERE id = %s"
    cursor.execute(sql_check_id, (id,))
    existing_id = cursor.fetchone()

    if existing_id:
        return redirect("http://localhost:3000/signup?error=ID already exists")
    else:
        # 비밀번호 확인 및 데이터 삽입
        if password != confirm_password:
            return "<a href='http://localhost:3000'>Passwords do not match</a>"
        else:
            sql_insert = "INSERT INTO login (id, password, name) VALUES (%s, %s, %s)"
            val = (id, password, name)
            cursor.execute(sql_insert, val)
            db.commit()
            return redirect("http://localhost:3000/login")


@app.route('/api/check_username/<username>', methods=['GET'])
def check_username(username):
    sql = "SELECT id FROM login WHERE id = %s"
    cursor.execute(sql, (username,))
    result = cursor.fetchone()

    is_taken = result is not None
    return jsonify({'isTaken': is_taken})

if __name__ == '__main__':
    app.run(debug=True)
