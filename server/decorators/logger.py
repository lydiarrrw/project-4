from app import app
from flask import Flask, jsonify, request
# from pprint import pprint

@app.before_request
def log():
    print('-----LOGGER----')
    print(f'⭐ Method: {request.method}')
    print(f'⭐ Headers: {request.headers}')
    print(f'⭐ Body: 🦵 {request.json}')
    print(f'⭐ Url: {request.url}')
  