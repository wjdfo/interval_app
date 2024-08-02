from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "interval"

CORS(app)
timers = {
    "user" : {
            "테스트1" : [3, 3, 2, 5, 2],
            "테스트2" : [1, 2, 3, 4, 5]
        }
}

@app.route('/', methods = ['POST'])
def initialize() :
    if request.method == 'POST' :
        DB_user_id = request.json.get('userId')
        print(timers[DB_user_id])
        
        return timers[DB_user_id]

@app.route('/append', methods = ['POST'])
def edit() :
    if request.method == 'POST' :
        try :
            DB_user_id = request.json.get('userId')
            title = request.json.get('title')
            timer = []
            for i in request.json.get('timer') :
                timer.append(int(i))

        except :
            print("형식을 맞춰서 POST 요청을 보내주세요.")
            return

        return_dict = {
            "success" : False
        }

        if DB_user_id in timers.keys() :
            if title in timers[DB_user_id].keys() :
                return return_dict

            timers[DB_user_id][title] = timer
            return_dict["success"] = True
            return_dict[DB_user_id] = timers

            print(return_dict)

            return return_dict

        print(request.json.get('title'))
        print(request.json.get('userId'))
        print(request.json.get('timer'))

        



if __name__ == "__main__" :
    app.run(port = 5000)
    # app.run(debug = True, host = '0.0.0.0', port = 5000)