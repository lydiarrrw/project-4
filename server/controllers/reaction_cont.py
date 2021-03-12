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
    # print(reaction_dictionary, act)    
    # add act then change act id below
    try:
        reaction = reaction_schema.load(reaction_dictionary)
        print(reaction)
        reaction.act_id = act_id
        print(reaction.act)
        reaction.user = g.current_user
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    
    reaction.save()
    
    return reaction_schema.jsonify(reaction)


# -----DELETE ACT REACTIONS------

@router.route("/reactions/<int:reaction_id>", methods=["DELETE"])
def delete_reaction(reaction_id):
    reaction = Reaction.query.get(reaction_id)
    reaction.remove()
    # if not current user
    return 'You\'ve deleted your reaction', 202