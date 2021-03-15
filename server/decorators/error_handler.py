from app import app
from flask import Flask, jsonify
from marshmallow.exceptions import ValidationError

@app.errorhandler(ValidationError)
def validation_error(e):
    return {"message": e.messages}

@app.errorhandler(Exception)
def general_error(e):
    return{"message": str(e)}, 400

@app.errorhandler(AssertionError)
def assertion_error(e):
    return jsonify(message = str(e)), 400

# @app.errorhandler()
# def admin_access_only(e):
#     # if user.id is not an admin:
#     return{"error: Not Authorised"}