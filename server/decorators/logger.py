from app import app
from flask import Flask, jsonify, request

@app.before_request
def log():
    print('This is the logger')
    print(request.json)
    print('Add more useful information in here')