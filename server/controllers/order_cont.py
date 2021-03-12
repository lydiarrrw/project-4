from flask import Blueprint, request, g
from models.product_model import Product
from serializers.product_serial import ProductSchema
from models.order_model import Order
from serializers.order_serial import OrderSchema
from marshmallow.exceptions import ValidationError


product_schema = ProductSchema()
order_schema = OrderSchema()

router = Blueprint(__name__, "orders")

# -------- GET ALL PRODUCTS -------
@router.route("/products", methods=["GET"])
def get_menu():
    products = Product.query.all()
    # if not act_reactions:
    #     return {"message": "No one has reacted to this act"}, 404
    return product_schema.jsonify(products, many=True), 200


# -------- PLACE AN ORDER -------

# @router.route("/orders", methods=["POST"])
# def place_order():
#     order_dictionary = request.json
#     print(order_dictionary)

#     try:
#         order = order_schema.load(order_dictionary)
#         order.user = g.current_user
    
#     except ValidationError as e:
#         return {"errors": e.messages, "messages": "Something went wrong"}
    
#     order.save()
#     return order_schema.jsonify(order), 200


# -------- DELETE AN ORDER -------

@router.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    order = Order.query.get(order_id)
    print(order)

    # if order.user != g.current_user:
    #     return {"errors": "You can\'t delete someone else\'s order"}, 200
    order.remove()

    return {"message": "Order deleted successfully"}, 200