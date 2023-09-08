"""This is the main api module"""
from flask import Flask, request, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, logout_user
from flask_migrate import Migrate

app = Flask(__name__)
app.config["SECRETE_KEY"] = "xm*ms'hek$woan348n9Dkb%diCnmi3n@ij+3mWhr83nI3ni"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eduquest.sqlite'

db = SQLAlchemy(app)
login_manager = LoginManager(app)
migrate = Migrate(app, db)


@app.route("/", methods=["GET"])
def index():
    return "Hello World"







if __name__ == "__main__":
    """main flask app"""
    app.run(debug=True, host='0.0.0.0', port=8085)
