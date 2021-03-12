from app import app
from flask import Flask, jsonify
from marshmallow.exceptions import ValidationError

@app.errorhandler(ValidationError)
def validation_error(e):
    return{"errors": e.messages, "messages":"Something went wrong"}

@app.errorhandler(Exception)
def general_error(e):
    return{"errors": str(e), "messages":"Something else went wrong"}

# @app.errorhandler()
# def admin_access_only(e):
#     # if user.id is not an admin:
#     return{"error: Not Authorised"}