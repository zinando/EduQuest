""" this module will help create instances of extensions such as db"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

app = Flask(__name__)
app.config["SECRET_KEY"] = "xm*ms'hek$woan348n9Dkb%diCnmi3n@ij+3mWhr83nI3ni"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eduquest.sqlite'

db = SQLAlchemy(app)
login_manager = LoginManager(app)
migrate = Migrate(app, db)
