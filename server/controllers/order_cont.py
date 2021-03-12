from flask import Blueprint, g
from serializers.order_serial import OrderSchema

order_schema = OrderSchema()

router = Blueprint(__name__, "orders")