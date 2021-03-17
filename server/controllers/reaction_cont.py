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


# # # -----GET SINGLE REACTIONS------


@router.route("/reactions/<int:reaction_id>", methods=["GET"])
def get_single_reaction(reaction_id):
    reactions = Reaction.query.get(reaction_id)
    return reaction_schema.jsonify(reactions), 200


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
        return {"errors": e.messages, "message": "You were unable to make a reaction"}

    reaction.save()

    return act_schema.jsonify(act)


# -----DELETE ACT REACTIONS------


@router.route("/reactions/<int:reaction_id>", methods=["DELETE"])
@secure_route
def delete_reaction(reaction_id):
    reaction = Reaction.query.get(reaction_id)

    if reaction.user != g.current_user:
        return {"errors": "This isn't your reaction to delete"}, 402
    reaction.remove()

    return "You've deleted your reaction", 200


# ----- UPDATE YOUR REACTION------
@router.route("/reactions/<int:act_id>", methods=["PUT"])
@secure_route
def update_reactions(act_id):

# Getting all info
    user = g.current_user
    act = Act.query.get(act_id)
    reaction_dictionary = request.json["reaction_type"]

# Filtering the reaction list of the selected act
# Will return either a reaction if the current user has made one (thruthy)
# Or will return an empty array (falsy)
    find_reaction = [reaction for reaction in act.reactions if reaction.user.id == user.id]

# If above is true it means we want to remove the reaction for this act and this user
# Only allowed to react once per act and per user
# If above is false, create a new reaction and save it
    if find_reaction:
        find_reaction[0].remove()
        act.save()
    else:
        new_reaction = Reaction(reaction_type = reaction_dictionary, user_id = user.id, act_id = act_id) 
        new_reaction.save()

# Finally return the act with the reaction removed or added
    return act_schema.jsonify(act), 200