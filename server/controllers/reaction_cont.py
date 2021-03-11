# from flask import Blueprint, request
# from models.reaction_model import Reaction
# from serializers.reaction_serial import ReactionSchema
# from models.act_model import Act
# from serializers.act_serial import ActSchema

# from marshmallow.exceptions import ValidationError

# reaction_schema = ReactionSchema()
# act_schema = ActSchema()

# router = Blueprint(__name__, "reactions")

# # -----GET ACT REACTIONS------

# @router.route("acts/<int:act_id>/reactions", methods=["GET"])
# def get_act_reactions(act_id):
#     act_reactions = Reaction.query.get(act_id)
#     if not act_reactions:
#         return {"message": "No one has reacted to this act"}, 404
#     return reaction_schema.jsonify(act_reactions), 200
    

# # -----POST ACT REACTIONS------

# @router.route("acts/<int:act_id>/reactions", methods=["POST"])
# def make_reaction(act_id):
#     reaction_dictionary = request.json
#     act = Act.query.get(act_id)

#     try:
#         reaction = reaction_schema.load(reaction_dictionary)
#         reaction.act = act
    
#     except ValidationError as e:
#         return {"errors": e.messages, "messages": "Something went wrong"}
    
#     reaction.save()

#     return reaction_schema.jsonify(reaction)


# # -----DELETE ACT REACTIONS------

# @router.route("acts/<int:act_id>/reactions/<int:reaction_id>", methods=["DELETE"])
# def delete_reaction(act_id, reaction_id):
#     reaction = Reaction.query.get(reaction_id)
#     reaction.remove()
#     act = Act.query.get(act_id)
#     return act_schema.jsonify(act), 202