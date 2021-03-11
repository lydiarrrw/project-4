from app import ma
from models.user_model import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ("password_hash","isAdmin")
        load_only = ("email", "password")

    password = fields.String(required = True)
    acts = fields.Nested("ActSchema", many = True)