from app import ma
from models.reaction_model import Reaction
from marshmallow import fields

class ReactionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reaction
        load_instance = True
        exclude = ("created_at",)

    user = fields.Nested("SimpleUserSchema")

class SimpleReactionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reaction
        load_instance = True
        exclude = ("created_at",)

    acts = fields.Nested("SimpleActSchema", many = True)