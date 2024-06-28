from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "interval"

CORS(app)
timers = {
    "user" : {
            "개발자님이 만들어주신 타이머" : [3, 3, 2, 5, 2],
            "개발자님이 만들어주신 타이머2" : [1, 2, 3, 4, 5]
        }
}

@app.route('/', methods = ['POST'])
def initialize():
    if request.method == 'POST' :
        DB_user_id = request.json.get('userId')

        return timers[DB_user_id]


if __name__ == "__main__" :
    app.run(port = 5000)
    # app.run(debug = True, host = '0.0.0.0', port = 5000)