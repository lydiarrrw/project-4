from app import ma
from models.act_model import Act
from marshmallow import fields

class ActSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Act
        load_instance = True

reactions = fields.Nested("ReactionSchema", many = True)

class SimpleActSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Act
        load_instance = True
        exclude = ( "bio", "id", "created_at", "genre", "image", "official_website" )
        
