from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_kitty():
    return "Hello Kitty"

if __name__ == '__main__':
    app.run()