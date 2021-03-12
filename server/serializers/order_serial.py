from app import ma
from models.order_model import Order
from marshmallow import fields

class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True

    products = fields.Nested("SimpleProductSchema", many=True)
    act = fields.Nested("SimpleActSchema")
    user = fields.Nested("SimpleUserSchema")
