from flask import Blueprint, request, g, jsonify
from models.user_model import User
from models.act_model import Act
from serializers.user_serial import UserSchema
from serializers.act_serial import ActSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route


user_schema = UserSchema()
act_schema = ActSchema()

router = Blueprint(__name__, "users")


# ----- SIGN UP -----

@router.route("/signup", methods=["POST"])
def signup():
    user_json = request.json
    user_json["is_admin"] = False

    try:
        user = user_schema.load(user_json)

    except ValidationError as e:
        return { "errors": e.messages, "message": "Something went wrong." }, 400

    user.save()

    return user_schema.jsonify(user), 201


# ----- LOG IN -----

@router.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    if not email or not password:
        return { "message": "Email or password missing" }, 400

    user = User.query.filter_by(email = email).first()

    if not user or not user.validate_password(request.json["password"]):
        return { "message": "Wrong email or password entered" }, 404

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

    selected_act = Act.query.get(act_id)

    if not selected_act:
        return {'message': 'This act has not been found'}, 404

    if selected_act in user.acts:
        user.acts.remove(selected_act)
 
    else: 
        current_user_act_list = [act.set_time for act in user.acts if selected_act.set_time == act.set_time]
        
        if current_user_act_list:
            return {'message': 'You already have plans at this time. If you wish add this act to your personal schedule, please remove the clashing act first and then try to add the new act again.'}, 403
        
        else:
            user.acts.append(selected_act)
     
    user.save()

    return user_schema.jsonify(user), 200