from app import ma
from models.user_model import User
from marshmallow import fields, validates_schema
from marshmallow.exceptions import ValidationError

class UserSchema(ma.SQLAlchemyAutoSchema):

    @validates_schema
    def check_passwords_match(self, data, **kwargs):
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
                'Passwords do not match',
                'password_confirmation'
            )

    password = fields.String(required=True)
    password_confirmation = fields.String(required=True)
    
    class Meta:
        model = User
        load_instance = True
        exclude = ("password_hash","created_at")
        load_only = ("email", "password","is_admin", "password_confirmation")

    acts = fields.Nested("SimpleActSchema", many = True)
    orders = fields.Nested("OrderSchema", many = True)


class SimpleUserSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = User
        load_instance = True
        exclude = ("password_hash", "created_at")
        load_only = ("email", "password","is_admin", "password_confirmation")