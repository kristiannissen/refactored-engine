# Refactored Engine
Python/Javascript shopping list app running on Google App Engine

## To run in dev mode
export FLASK_ENV=development
export FLASK_APP=hello.py
flask run

This doesn't work with Google App Engine, they use a different approach https://cloud.google.com/appengine/docs/standard/python3/building-app/writing-web-service
