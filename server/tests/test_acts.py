from app import app, db
import json
from tests.lib import login


def test_get_acts():

    client = app.test_client()
    response = client.get("/api/acts")  
    assert len(response.json) == 36
    assert response.status_code == 200
