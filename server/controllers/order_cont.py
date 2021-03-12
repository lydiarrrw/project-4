from flask import Blueprint, g, request
from models.product_model import Product 
from models.order_model import Order
from models.user_model import User
from serializers.product_serial import ProductSchema
from serializers.order_serial import OrderSchema
from serializers.user_serial import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

product_schema = ProductSchema()
order_schema = OrderSchema()
user_schema = UserSchema()

router = Blueprint(__name__, "orders")

@router.route("/products", methods=["GET"])
def get_all_products():
    products = Product.query.all()
    return product_schema.jsonify(products, many=True), 200

@router.route("/order", methods=["GET"])
def get_all_orders():
    orders = Order.query.all()
    return order_schema.jsonify(orders, many=True), 200

@router.route("/order/<int:act_id>", methods=["POST"])
@secure_route
def create_an_order(act_id):
    #get the order
    order_dictionary = request.json
    #get the user
    
    print(f'ORDER DICTIONARY = {order_dictionary}')
    try:
        order = order_schema.load(order_dictionary)
        order.user = g.current_user
        order.act_id = act_id

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong 🙅🏼‍♀️' }
    
    order.save()

    return order_schema.jsonify(order), 200

@router.route("/order/<int:order_id>", methods=["DELETE"])
def delete_an_order(order_id):
    order = Order.query.get(order_id)
    order.remove()
    return { 'message': 'order removed successfully' }, 200

