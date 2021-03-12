from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.environment import db_URI
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)

from decorators import error_handler, logger

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)

bcrypt = Bcrypt(app)

from controllers import act_cont, order_cont, reaction_cont, user_cont

app.register_blueprint(act_cont.router, url_prefix='/api')
app.register_blueprint(order_cont.router, url_prefix='/api')
# app.register_blueprint(reaction_cont.router, url_prefix='/api')
app.register_blueprint(user_cont.router, url_prefix='/api')