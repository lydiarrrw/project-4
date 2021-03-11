from app import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import *
import jwt
from config.environment import secret

from models.base_model import BaseModel
from models.act_model import Act
from models.users_acts_model import users_acts_join



class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(15), nullable = False, unique = True)
    email = db.Column(db.Text, nullable = False, unique = True)
    is_admin = db.Column(db.Boolean, nullable = False)
    password_hash = db.Column(db.String(128), nullable = True)

    acts = db.relationship('Act', backref = 'users', secondary = users_acts_join)


    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plain_text):
        self.password_hash = bcrypt.generate_password_hash(password_plain_text).decode('utf-8')


    def validate_password(self,password_plain_text):
        return bcrypt.check_password_hash(self.password_hash, password_plain_text)


    def generate_token(self):
        payload = {
            'sub': self.id,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow + timedelta(days = 1)
        }
        token = jwt.encode(payload, secret, 'HS256')
        return token