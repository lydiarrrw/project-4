from app import db
from models.base_model import BaseModel

class Reaction(db.Model, BaseModel):

    __tablename__ = 'reactions'
    reaction_type = db.Column(db.Text, nullable=False)

    # relationship 1 act to many reactions
    act_id = db.Column(db.Integer, db.ForeignKey('acts.id', ondelete="CASCADE"))

    # relationship 1 user to many reactions
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))