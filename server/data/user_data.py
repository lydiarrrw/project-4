from models.user_model import User

user_list = [
    User(username="fabien", email="fab@fab.com", password="fabfabfab1", password_confirmation="fabfabfab1", is_admin=True),
    User(username="lydia", email="lydia@lydia.com", password="lydialydia1", password_confirmation="lydialydia1", is_admin=True),
    User(username="kate", email="kate@kate.com", password="katekate1", password_confirmation="katekate1", is_admin=True),
    User(username="test", email="test@test.com", password="testtest1", password_confirmation="testtest1", is_admin=False),
]