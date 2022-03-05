from flask import *
from datetime import datetime
from .db import cursor

app_comments = Blueprint("app_comments",__name__)

class CommentController():
    def index(self):

        query = "SELECT * FROM comments"
        cursor.execute(query)

        return cursor.fetchall()

    def store(self, text):
        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = "INSERT INTO `comments`.`comments` (`user_id`, `product_id`, `text`, `star_value`, `star_count`, `like_count`, `dislike_count`, `created_at`, `updated_at`, `status`) VALUES ('3', '3', '{0}', '5', '6', '7', '8', '{1}', NULL, 'evet');".format(text,created_at)
        
        query2 = "INSERT INTO `comments`.`comments` (`user_id`, `product_id`, `text`, `star_value`, `star_count`, `like_count`, `dislike_count`, `created_at`, `updated_at`, `status`) VALUES (?,?,?,?,?,?,?,?,NULL,?);"
        cursor.execute(query2,text)
        return '{ "status":"succes" }'

    def edit(self):
        pass

    def update(self):
        pass

    def destroy(self):
        pass


@app_comments.route("/comments",methods=['GET'])
def index():
    controller = CommentController()
    return jsonify(controller.index())

@app_comments.route("/comments",methods=['POST'])
def store():
    json_object = request.get_json()
    
    
    controller = CommentController()
    return controller.store(text=json_object["text"])

@app_comments.route("/comments/<int:id>",methods=['GET'])
def show(id):
    return

@app_comments.route("/comments/<id>/edit",methods=['GET'])
def edit():
    return

@app_comments.route("/comments/<id>",methods=['PUT'])
def update():
    return

@app_comments.route("/comments/<id>",methods=['DELETE'])
def destroy():
    return
