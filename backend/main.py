# Main app entry point to initialize the entire system
# define page router here -- no need in this case

from flask import Flask,jsonify
from flask import render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get-room-url', methods=['GET'])
def get_room_url():
    return jsonify({"room_url": "https://yiwen.daily.co/pipecat-test"})

if __name__ == '__main__':
    app.run(debug=True)
