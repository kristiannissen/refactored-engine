import os
from functools import wraps

from flask import Flask, render_template, request, redirect, jsonify

from models import user_authenticate, user_create, user_lists, list_create, list_delete

app = Flask(__name__)

@app.route('/')
def hello():
    # TODO: create index page
    return render_template('index.html')

@app.route('/signin/', methods=["GET", "POST"])
def signin():
    if request.method == 'POST':
        # TODO: Pull mail and token from request and pass it
        # to backend
        if not 'Authorization' in request.headers:
            return jsonify(message='Not authorized'), 401

        data = request.get_json()
        token = request.headers['Authorization']

        if not 'email' in data:
            return jsonify(message='No email provided'), 401

        user = user_authenticate(mail=data['email'])

        if user == None:
            # If the user/email doesn't exist, create it
            user = user_create(mail=data['email'])

        return jsonify(loc='/app/', user_id=user.id)

    # TODO: create page
    return render_template('signin.html')

@app.route('/app/')
def app_index():
    return render_template('app.html')

@app.route('/service/<user_id>/lists/', methods=["GET", "POST"])
def service_list(user_id=None):
    if request.method == 'POST':
        data = request.get_json()
        list_create(data['list_name'], user_id)

    user_lists_data = user_lists(user_id=user_id)
    list_data = []
    for item in user_lists_data:
        list_data.append({
                'name': item['name'],
                'id': item.key.id,
                'created_at': item['created_at'],
                'items': item['items']
            })

    return jsonify(user_lists=list_data)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
