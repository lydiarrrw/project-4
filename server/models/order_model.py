from app import db
from models.base_model import BaseModel
from models.product_model import Product
from models.products_orders_model import products_orders_join


class Order(db.Model, BaseModel):
    __tablename__ = "orders"

    ready_to_collect = db.Column(db.Boolean, nullable =True)

    #relationship 1 user to many orders
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))

    #relationship 1 act to many orders
    act_id = db.Column(db.Integer, db.ForeignKey("acts.id", ondelete="CASCADE"))

    #relationship many orders to many products
    products = db.relationship("Product", backref = "orders", secondary=products_orders_join)