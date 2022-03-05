from flask import *
from datetime import datetime
from .db import cursor

app_stars = Blueprint("app_stars",__name__)


class StarsController():
    def edit(self):
        pass

    def store(self, text):
        pass

    def destroy(self):
        pass


@app_stars.route("/comments/<int:id>/stars/<int:id>/edit",methods=['GET'])
def edit(id):
    return ""

@app_stars.route("/comments/<int:id>/stars",methods=['POST'])
def store():
    return ""

@app_stars.route("/comments/<int:id>/stars/<int:id>",methods=['PUT'])
def destroy():
    return ""

