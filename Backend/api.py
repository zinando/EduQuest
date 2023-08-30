"""This is the main api module"""
from flask import Flask, request, current_app
from flask_sqlalchemy import SQLAlchemy


def create_app():
    app = Flask(__name__)
    app.config["SECRETE_KEY"] = "xmmshekwoan348n9kbdinmi3nij3mhr83n3ni"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eduquest.sqlite'
    return app


app = create_app()
db = SQLAlchemy(app)

@app.route("/", methods=["GET"])
def index():
    return "Hello World"







if __name__ == "__main__":
    """main flask app"""
    app.run(debug=True, host='0.0.0.0', port=8085)
