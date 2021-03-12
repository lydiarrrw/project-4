from flask import Blueprint, request, g
from models.act_model import Act 
from serializers.act_serial import ActSchema

act_schema = ActSchema()

router = Blueprint(__name__, "acts")

@router.route("/acts", methods=["GET"])
def get_full_lineup():
    acts = Act.query.all()
    return act_schema.jsonify(acts, many=True), 200

@router.route("/acts/<int:act_id>/", methods=["GET"])
def get_single_act(act_id):
    act = Act.query.get(act_id)
    # Catch id input error 
    if not act:
        return { 'message': 'Act not found, try entering a valid act_id from the lineup' }, 404
    
    return act_schema.jsonify(act), 200
