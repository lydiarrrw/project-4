from flask import request, g
from functools import wraps
from models.user_model import User
from config.environment import secret
import jwt


def secure_route(route_function):

    @wraps(route_function)
    def wrapper(*args, **kwargs):
        
        token_with_bearer = request.headers.get("Authorization")

        if not token_with_bearer:
            return {"message": "Unvalid token"}, 401

        token = token_with_bearer.replace("Bearer ","")

        try:
            payload = jwt.decode(token, secret, "HS256")

            user_id = payload["sub"]

            user = User.query.get(user_id)

            if not user:
                return {"message": "User not found"}, 401

            g.current_user = user

        except jwt.ExpiredSignatureError:
            return {"message":"Token expired"}

        except Exception as e:
            return {"errors": str(e)}, 401

        return route_function(*args, **kwargs)
    
    return wrapper