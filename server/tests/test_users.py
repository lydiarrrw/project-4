from app import app, db
import json
from tests.lib import login

# def test_signup():
#     client = app.test_client()

#     user_data = {
#         "username": "bob", 
#         "email": "bob@bob.com", 
#         "password": "bobbobbob1", 
#         "is_admin": True,
#         "password_confirmation": "bobbobbob1"
#         }

#     user_response = client.post(
#         "api/signup",
#         data = json.dumps(user_data),
#         content_type = "application/json"
#         )

#     assert user_response["username"] == "bob"
#     assert user_response["email"] == "bob@bob.com"
#     assert user_response["is_admin"] == False