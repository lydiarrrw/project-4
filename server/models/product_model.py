from app import db
from models.base_model import BaseModel

class Product(db.Model, BaseModel):
    __tablename__ = "products"

    #product_id created by app
    product_name = db.Column(db.String(40), nullable=False)
    product_type = db.Column(db.String(20), nullable =False)
    price = db.Column(db.Float, nullable=False)
    in_stock = db.Column(db.Boolean, nullable=False)
    image = db.Column(db.Text)

