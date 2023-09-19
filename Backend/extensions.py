""" this module will help create instances of extensions such as db"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["SECRET_KEY"] = "xm/msh>ek$woan348n9#DkbiCn<mi3n@ij+3mWhr83nI3ni"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///eduquest.sqlite"
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["JWT_SECRET_KEY"] = "xm/mshek$woan348n9>Dkb#iCn<mi3n@ij+3mWhr83nI3ni"

db = SQLAlchemy(app)
login_manager = LoginManager(app)
# migrate = Migrate(app, db)
jwt = JWTManager(app)
