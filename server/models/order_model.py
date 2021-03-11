from app import db
from models.base import BaseModel

class Order(db.Model, BaseModel):
    __tablename__ = "orders"

#one user to many orders
user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))
#many orders to one act
act_id = db.Column(db.Integer, db.ForeignKey("acts.id", ondelete="CASCADE"))
ready_to_collect = db.Column(db.Boolean, nullable=False)
