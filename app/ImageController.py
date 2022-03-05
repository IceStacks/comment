from flask import *
from datetime import datetime
from .db import cursor


app_images = Blueprint("app_images",__name__)

class ImagesController():
    def index(self):
        pass

    def store(self, text):
        pass

    def edit(self):
        pass

    def update(self):
        pass

    def destroy(self):
        pass


@app_images.route("/comments/<int:id>/images",methods=['GET'])
def index():
    return

@app_images.route("/comments/<int:id>/images",methods=['POST'])
def store():
    return

@app_images.route("/comments/<int:id>/images/<int:id>",methods=['GET'])
def show():
    return

@app_images.route("/comments/<int:id>/images/<int:id>/edit",methods=['GET'])
def edit():
    return

@app_images.route("/comments/<int:id>/images/<int:id>",methods=['PUT'])
def update():
    return

@app_images.route("/comments/<int:id>/images/<int:id>",methods=['DELETE'])
def destroy():
    return
