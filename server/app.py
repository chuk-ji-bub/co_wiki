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

if __name__ == '__main__':
    app.run(debug=True)
