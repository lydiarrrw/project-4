from app import app, db
import json
from tests.lib import login


def test_signup():
    client = app.test_client()

    signup_data = {
        "username": "bob", 
        "email": "bob@bob.com", 
        "password": "bobbobbob1", 
        "is_admin": True,
        "password_confirmation": "bobbobbob1"
        }

    signup_response = client.post(
        "api/signup",
        data = json.dumps(signup_data),
        content_type = "application/json"
        )

    assert signup_response.json["username"] == "bob"
    assert isinstance(signup_response.json["id"], int)



def test_login():
    client = app.test_client()

    login_data = {
        "email": "bob@bob.com", 
        "password": "bobbobbob1", 
        }

    login_response = client.post(
        "api/login",
        data = json.dumps(login_data),
        content_type = "application/json"
        )

    assert len(login_response.json["token"]) != 0



def bob_login(client):
    login_data = {
        "email": "bob@bob.com", 
        "password": "bobbobbob1", 
        }
    login_response = client.post(
        "api/login",
        data = json.dumps(login_data),
        content_type = "application/json"
        )
    token = login_response.json["token"]
    return token



def test_get_user_profile():
    client = app.test_client()

    token = bob_login(client)

    request_headers = {"Authorization": f"Bearer {token}"}

    profile_response = client.get(
        "api/profile",
        headers = request_headers
        )

    assert profile_response.status_code == 200
    assert profile_response.json["username"] == "bob"
    assert isinstance(profile_response.json["id"], int)
    assert len(profile_response.json["acts"]) == 0
    assert len(profile_response.json["orders"]) == 0



def test_update_personal_schedule():
    client = app.test_client()

    token = bob_login(client)

    request_headers = {"Authorization": f"Bearer {token}"}

    act_response1 = client.put("api/profile/12", headers = request_headers)
    assert act_response1.json["acts"][0]["id"] == 12

    act_response2 = client.put("api/profile/22", headers = request_headers)
    assert act_response2.json["acts"][1]["id"] == 22
    assert len(act_response2.json["acts"]) == 2

    act_response3 = client.put("api/profile/12", headers = request_headers)
    assert act_response3.json["acts"][0]["id"] == 22
    assert len(act_response3.json["acts"]) == 1

    act_response4 = client.put("api/profile/36", headers = request_headers)
    assert len(act_response4.json["acts"]) == 2

    act_response4 = client.put("api/profile/6", headers = request_headers)
    assert len(act_response4.json["acts"]) == 3

    act_response4 = client.put("api/profile/11", headers = request_headers)
    assert len(act_response4.json["acts"]) == 4

    act_response4 = client.put("api/profile/21", headers = request_headers)
    assert len(act_response4.json["acts"]) == 5

    act_response5 = client.put("api/profile/36", headers = request_headers)
    assert len(act_response5.json["acts"]) == 4



def test_schedule_clash():
    client = app.test_client()

    token = bob_login(client)

    request_headers = {"Authorization": f"Bearer {token}"}

    act_response1 = client.put("api/profile/15", headers = request_headers)
    assert len(act_response1.json["acts"]) == 1

    act_response2 = client.put("api/profile/3", headers = request_headers)
    assert act_response2.status_code == 403
    assert len(act_response2.json["acts"]) == 1