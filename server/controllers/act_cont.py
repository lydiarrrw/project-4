from flask import Blueprint, g
from serializers.act_serial import ActSchema

act_schema = ActSchema()

router = Blueprint(__name__, "acts")