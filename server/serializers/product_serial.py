from app import ma
from models.product_model import Product

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True
        exclude = ("created_at",)

class SimpleProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True
        exclude = ( "in_stock", "product_type", "created_at" )