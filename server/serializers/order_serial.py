from app import ma
from models.order_model import Order
from marshmallow import fields

class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True

# nest products inside of order??
products = fields.Nested("ProductSchema", many=True)