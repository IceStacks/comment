from flask import *
from datetime import datetime

from .db import cursor

app_likes = Blueprint("app_likes",__name__)


class LikesController():
    def show(self):
        pass

    def store(self, text):
        pass

    def destroy(self):
        pass


@app_likes.route("/comments/<int:id>/likes/<int:id>",methods=['GET'])
def show():
    return ""

@app_likes.route("/comments/<int:id>/likes",methods=['POST'])
def store(id):
    return ""

@app_likes.route("/comments/<int:id>/likes/<int:id>",methods=['DELETE'])
def destroy():
    return ""

