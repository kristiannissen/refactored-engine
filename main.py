import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    # TODO: create index page
    return render_template('app.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
