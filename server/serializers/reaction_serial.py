from app import ma
from models.reaction_model import Reaction

class ReactionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reaction
        load_instance = True