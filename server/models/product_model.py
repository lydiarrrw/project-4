from app import db
from models.base import BaseModel
​
​
class Product(db.Model, BaseModel):
    __tablename__ = "products"
​
    product_name = db.Column(db.String(40), nullable=False)
    product_type = db.Column(db.String(20), nullable =False)
    price = db.Column(db.Float, nullable=False)
    in_stock = db.Column(db.Bool, nullable=False)
​






