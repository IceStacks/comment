from flask import Flask

from app.CommentController import app_comments
# from app.LikesController import app_likes
# from app.DislikesController import app_dislikes
# from app.StarsController import app_stars
# from app.ImageController import app_images

app = Flask(__name__)



app.register_blueprint(app_comments)
# app.register_blueprint(app_likes)
# app.register_blueprint(app_dislikes)
# app.register_blueprint(app_stars)
# app.register_blueprint(app_images)

app.run(debug=True)