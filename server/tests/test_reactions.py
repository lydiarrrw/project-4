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
    # login ---
    login_data = {"password":"lydia", "email":"lydia@lydia.com"}
    response = client.post('/api/login', data=json.dumps(login_data), content_type="application/json")
    token = response.json
    # ---
    
    
    # # token = login(client)
    # reaction_data = {"reaction_type": "🎉"}
    # request_headers = {"Authorization": f"Bearer {token}"}
    # reaction_response = client.post(
    #     "/api/reactions",
    #     data=json.dumps(reaction_data),
    #     content_type="application/json",
    #     headers=request_headers,
    # )
    # assert reaction_response.json["reaction_type"] == '🎉'

# def test_delete_reaction