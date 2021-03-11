from app import db
from models.base_model import BaseModel
from models.user_model import User

class Reaction(db.Model, BaseModel):

    __tablename__ = 'reactions'
    reaction_type = db.Column(db.Text, nullable=False)
    act_id = db.Column(db.Integer, db.ForeignKey('acts.id', ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))