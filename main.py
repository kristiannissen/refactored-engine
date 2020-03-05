import os
from functools import wraps

from flask import Flask, render_template, request, redirect, jsonify, g
from google.cloud import datastore

from models import User

env = os.getenv('APP_ENV', 'production')

if env is not 'production':
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/kn/Documents/private/refactored-engine/refactored-engine-9a76290b675f.json'

datastore_client = datastore.Client()

app = Flask(__name__)

@app.route('/')
def hello():
    # TODO: create index page
    return render_template('index.html')

@app.route('/signin/', methods=["GET", "POST"])
def signin():
    if request.method == 'POST':
        return jsonify(loc='/app/')

    # TODO: create page
    return render_template('signin.html')

@app.route('/app/')
def app_index():
    return render_template('app.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
