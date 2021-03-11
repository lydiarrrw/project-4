import app import db, bcrypt 
from models.base import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    user_name = db.Column(db.String(15), nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    is_admin = False
    # password_hash = db.Column(db.String(128), nullable=True)

    # @hybrid_property
    # def password(self):
    #     pass

    # @password.setter
    # def password(self, password_plaintext):
    #     encoded_pw = bcrypt.generate_password_hash(password_plaintext)
    #     self.password_hash = encoded_pw.decode('utf-8')