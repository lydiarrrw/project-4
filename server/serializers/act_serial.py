from app import ma
from models.act_model import Act

class ActSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Act
        load_instance = True