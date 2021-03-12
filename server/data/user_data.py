from models.user_model import User

user_list = [
    User(username="fabien", email="fab@fab.com", password="fabfabfab1", is_admin=True,password_confirmation="fabfabfab1"),
    User(username="lydia", email="lydia@lydia.com", password="lydialydia1", is_admin=True,password_confirmation="lydialydia1"),
    User(username="kate", email="kate@kate.com", password="katekate1", is_admin=True, password_confirmation="katekate1"),
    User(username="test", email="test@test.com", password="testtest1", is_admin=False, password_confirmation="testtest1")
]