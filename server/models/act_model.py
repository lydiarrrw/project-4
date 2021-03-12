from app import db
from models.base_model import BaseModel
from models.order_model import Order
from models.reaction_model import Reaction

class Act(db.Model, BaseModel):

    __tablename__ = "acts"

    stage_name = db.Column(db.String(40), nullable=False)
    set_time = db.Column(db.String(5), nullable=False)
    artist_name = db.Column(db.String(50), nullable=False, unique=True)
    image = db.Column(db.Text, nullable=False)
    official_website = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String(40), nullable=False)
    bio = db.Column(db.Text, nullable=False)
    
    #relationship 1 act to many orders
    orders = db.relationship("Order", backref="act", cascade="all, delete")

    #relationship 1 act to many reactions
    reactions = db.relationship("Reaction", backref="act", cascade="all, delete")
    
