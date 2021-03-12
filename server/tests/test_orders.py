from app import app, db
import json
from tests.lib import login

def test_get_products():

    client = app.test_client()
    response = client.get("/api/products")  
    assert len(response.json) == 24
    assert response.status_code == 200