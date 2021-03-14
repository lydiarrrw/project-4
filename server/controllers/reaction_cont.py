from flask import Blueprint, request, g
from models.reaction_model import Reaction
from serializers.reaction_serial import ReactionSchema
from models.act_model import Act
from serializers.act_serial import ActSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

reaction_schema = ReactionSchema()
act_schema = ActSchema()

router = Blueprint(__name__, "reactions")

# # # -----GET ALL REACTIONS - DELETE BEFORE DEPLOYMENT------

@router.route("/reactions", methods=["GET"])
def get_reactions():
    reactions = Reaction.query.all()
    # if not act_reactions:
    #     return {"message": "No one has reacted to this act"}, 404
    return reaction_schema.jsonify(reactions, many=True), 200
    


# -----POST ACT REACTIONS------

@router.route("/reactions/<int:act_id>", methods=["POST"])
@secure_route
def make_reaction(act_id):
    reaction_dictionary = request.json
    act = Act.query.get(act_id)
    
    try:
        reaction = reaction_schema.load(reaction_dictionary)

        reaction.act = act

        reaction.user = g.current_user
    except ValidationError as e:
        return {"errors": e.messages, "message": "Something went wrong"}
    
    reaction.save()
    
    return act_schema.jsonify(act)


# -----DELETE ACT REACTIONS------

@router.route("/reactions/<int:reaction_id>", methods=["DELETE"])
@secure_route
def delete_reaction(reaction_id):
    reaction = Reaction.query.get(reaction_id)

    if reaction.user != g.current_user:
        return {'errors': 'This isn\'t your reaction to delete'}, 402 
    reaction.remove()
    
    return 'You\'ve deleted your reaction', 200