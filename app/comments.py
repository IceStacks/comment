from flask import *
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "1234567"
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_DB"] = "comments"

mysql = MySQL(app)

@app.route("/comments",methods=['GET'])
def index():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM comments;")
    sonuc = cursor.fetchall()
    main_data = []
    for i in sonuc:
        data = {
            "id":i[0],
            "user_id":i[1],
            "product_id":i[2],
            "text":i[3],
            "star_value":i[4],
            "star_count":i[5],
            "like_count":i[6],
            "dislike_count":i[7],
            "created_at":i[8],
            "updated_at":i[9],
            "status":i[10],
            "image_count":i[11]
        }
        main_data.append(data)

    return jsonify(main_data)

@app.route("/comments",methods=['POST'])
def store():
    return

@app.route("/comments/<int:id>",methods=['GET'])
def show(id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM comments WHERE product_id = {};".format(id))
    sonuc = cursor.fetchall()
    main_data = []
    for i in sonuc:
        data = {
            "id":i[0],
            "user_id":i[1],
            "product_id":i[2],
            "text":i[3],
            "star_value":i[4],
            "star_count":i[5],
            "like_count":i[6],
            "dislike_count":i[7],
            "created_at":i[8],
            "updated_at":i[9],
            "status":i[10],
            "image_count":i[11]
        }
        main_data.append(data)

    return jsonify(main_data)

@app.route("/comments/<id>/edit",methods=['GET'])
def edit():
    return

@app.route("/comments/<id>",methods=['PUT'])
def update():
    return

@app.route("/comments/<id>",methods=['DELETE'])
def destroy():
    return

app.run()