from app import app, db
import json
from tests.lib import login

def test_get_reactions():
    client = app.test_client()
    response = client.get("/api/reactions")  
    assert len(response.json) == 0
    assert response.status_code == 200

def test_make_reaction():
    # create a client
    client = app.test_client()
    login ---
    login_data = {"password":"test", "email":"test@test.com"}
    login_response = client.post('/api/login', data=json.dumps(login_data), content_type="application/json")
    token = login_response.json
    # ---
    assert len(token) !=0
    
    # token = login(client)
    reaction_data = {"reaction_type":"🎉"}
    print(reaction_data)
    request_headers = {"Authorization": f"Bearer {token}"}
    reaction_response = client.post(
        "/api/reactions",
        data=json.dumps(reaction_data),
        content_type="application/json",
        headers=request_headers,
    )
    print(reaction_response)
    assert reaction_response.json["reaction_type"] == "🎉"

# def test_delete_reaction