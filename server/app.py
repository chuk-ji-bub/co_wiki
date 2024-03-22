from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import chess

app = Flask(__name__)

# 데이터베이스 설정: 실제 값으로 대체하세요.
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/dbname'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# 모델 정의: User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

# 체스 게임 로직을 관리하는 클래스
class ChessGame:
    def __init__(self):
        self.board = chess.Board()

    def get_board(self):
        return self.board

    def move(self, move_uci):
        move = chess.Move.from_uci(move_uci)
        if move in self.board.legal_moves:
            self.board.push(move)
            return True
        return False

# 체스 게임 인스턴스 생성
game = ChessGame()

# 기본 라우트
@app.route('/')
def hello_world():
    return 'Hello, World!'

# 사용자 목록을 반환하는 라우트
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in users])

# 사용자 추가를 위한 라우트
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'}), 201

# 체스판의 상태를 반환하는 라우트
@app.route('/chess/board', methods=['GET'])
def get_chess_board():
    return str(game.get_board())

# 체스 움직임을 수행하는 라우트
@app.route('/chess/move', methods=['POST'])
def make_chess_move():
    data = request.get_json()
    move_uci = data.get('move')
    if game.move(move_uci):
        return jsonify({'message': 'Move made successfully', 'board': str(game.get_board())})
    else:
        return jsonify({'message': 'Illegal move'}), 400

if __name__ == '__main__':
    app.run(debug=True)
