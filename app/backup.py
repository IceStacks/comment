from flask import *
import mysql.connector

from ..main import db

app_comment = Blueprint("app_comment",__name__)

class comments():
    
    db = mysql.connector.connect(host="localhost",
                        user='root',
                        passwd='1234567',
                        db='comments',
                        port=3306)
    cursor = db.cursor(dictionary=True)

    def __init__(self,id,user_id,product_id,text,star_value,star_count,like_count,dislike_count,created_at,updated_at,status,image_count):
        self.id = id
        self.user_id = user_id
        self.product_id = product_id
        self.text = text
        pass
    
    def index(self):
        pass


@app_comment.route("/comments",methods=['GET'])
def index():
    # cursor = db.connection.cursor()
    # cursor.execute("SELECT * FROM comments;")
    # sonuc = cursor.fetchall()
    # main_data = []
    # for i in sonuc:
    #     data = {
    #         "id":i[0],
    #         "user_id":i[1],
    #         "product_id":i[2],
    #         "text":i[3],
    #         "star_value":i[4],
    #         "star_count":i[5],
    #         "like_count":i[6],
    #         "dislike_count":i[7],
    #         "created_at":i[8],
    #         "updated_at":i[9],
    #         "status":i[10],
    #         "image_count":i[11]
    #     }
    #     main_data.append(data)

    return "jsonify(main_data)"

@app_comment.route("/comments",methods=['POST'])
def store():
    return

@app_comment.route("/comments/<int:id>",methods=['GET'])
def show(id):
    cursor = db.connection.cursor()
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

@app_comment.route("/comments/<id>/edit",methods=['GET'])
def edit():
    return

@app_comment.route("/comments/<id>",methods=['PUT'])
def update():
    return

@app_comment.route("/comments/<id>",methods=['DELETE'])
def destroy():
    return

# app.run()