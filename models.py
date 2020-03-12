import os
from datetime import datetime

from google.cloud import datastore

env = os.getenv('APP_ENV', 'production')

# For development purposes
if env is not 'production':
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/kn/Documents/private/refactored-engine/refactored-engine-9a76290b675f.json'

datastore_client = datastore.Client()
# FIXME: rename to email
def user_create(mail=None):
    #
    user_key = datastore_client.key('User')
    user = datastore.Entity(key=user_key)
    user['created_at'] = datetime.now()
    user['last_visit'] = datetime.now()
    # FIXME: rename to email
    user['email'] = mail

    datastore_client.put(user)

    return user.key

# TODO: add datetime for last visit
def user_update(email=None):
    pass

# FIXME: Should return user Entity or None
# TODO: if the user exists, update last_visit
def user_authenticate(mail=None):
    query = datastore_client.query(kind='User')
    result = list(query.add_filter('email', '=', mail).fetch(1))[0]

    return result

# Return all lists belonging to the user
def user_lists(user_id=None):
    query = datastore_client.query(kind='UserList')
    result = list(query.add_filter('user_id', '=', user_id).fetch())

    return result

# Create a new list
def list_create(name=None, user_id=None):
    list_key = datastore_client.key('UserList')
    user_list = datastore.Entity(key=list_key)
    user_list['name'] = name
    user_list['user_id'] = user_id
    user_list['created_at'] = datetime.now()
    user_list['items'] = []

    datastore_client.put(user_list)

    return user_list.key

# Delete a specific list
def list_delete(entity=None):
    datastore_client.delete(entity.key)

# Model to share lists between users
def user_list_user(owner_id=None, list_id=None, user_id=None):
    pass

