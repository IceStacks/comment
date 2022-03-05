from flask import *
from datetime import datetime
from .db import cursor

app_dislikes = Blueprint("app_dislikes",__name__)

class DislikesController():
    def show(self):
        pass

    def store(self, text):
        pass

    def destroy(self):
        pass


@app_dislikes.route("/comments/<int:id>/dislikes/<int:id>",methods=['GET'])
def show():
    return

@app_dislikes.route("/comments/<int:id>/dislikes",methods=['POST'])
def store(id):
    return

@app_dislikes.route("/comments/<int:id>/dislikes/<int:id>",methods=['DELETE'])
def destroy():
    return

