from flask import Blueprint, request, g
from models.user_model import User
from models.act_model import Act
from serializers.user_serial import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route


user_schema = UserSchema()

router = Blueprint(__name__, "users")


# ----- SIGN UP -----

@router.route("/signup", methods=["POST"])
def signup():
    user_json = request.json
    user_json["is_admin"] = False

    try:
        user = user_schema.load(user_json)

    except ValidationError as e:
        return { "errors": e.messages, "messages": "Something went wrong." }, 400

    user.save()

    return user_schema.jsonify(user), 201



# ----- LOG IN -----

@router.route("/login", methods=["POST"])
def login():
    user = User.query.filter_by(email=request.json["email"]).first()

    if not user:
        return { "message": "No user found for this email" }, 404

    if not user.validate_password(request.json["password"]):
        return { "message" : "Wrong password entered" }, 401  

    token = user.generate_token()
    return { "token": token, "message": f"Welcome back {user.username.title()}!" }


# ----- GET FULL PROFILE -----

@router.route("/profile", methods=["GET"])
@secure_route
def get_user_profile():
    return user_schema.jsonify(g.current_user), 200

# ----- ADD OR REMOVE AN ACT FROM USER PROFILE -----

@router.route("/profile/<int:act_id>", methods=["PUT"])
@secure_route
def update_personal_schedule(act_id):

    user = g.current_user

    act = Act.query.get(act_id)

    if not act:
        return {'message': 'This act has not been found'}, 404

    if act in user.acts:
        user.acts.remove(act)

    else:
        user.acts.append(act)

    user.save()

    return user_schema.jsonify(user), 200


