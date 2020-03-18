import os
from datetime import datetime

from google.cloud import datastore

env = os.getenv('APP_ENV', 'production')

# For development purposes
if env is not 'production':
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/kn/Documents/private/refactored-engine/refactored-engine-9a76290b675f.json'

datastore_client = datastore.Client()

# Create user
def user_create(email=None):
    user_key = datastore_client.key('User')
    user = datastore.Entity(key=user_key)
    user['created_at'] = datetime.now()
    user['last_visit'] = datetime.now()
    user['email'] = email

    datastore_client.put(user)

    return user.key

# User get
def user_get(email=None):
    query = datastore_client.query(kind='User')
    result = list(query.add_filter('email', '=', email).fetch(1))

    if len(result) == 0:
        return None

    return result

# Delete user
def user_delete(key=None):
    user_key = datastore_client.key('User', key)
    return datastore_client.delete(user_key)

# TODO: add datetime for last visit
def user_update(email=None):
    pass

# FIXME: Should return user Entity or None
# TODO: if the user exists, update last_visit
def user_authenticate(mail=None):
    query = datastore_client.query(kind='User')
    result = query.add_filter('email', '=', mail).fetch(1)

    return list(result)

# Return all lists belonging to the user
def user_lists(user_id=None):
    query = datastore_client.query(kind='UserList')
    result = query.add_filter('user_id', '=', user_id).fetch()

    return list(result)

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

# Update list
def list_update(key=None, data=None):
    list_key = datastore_client.key('UserList', key)
    user_list = datastore.Key(key=list_key)

    print(user_list)

    return key

# Fetch a single list
def list_get(entity=None):
    pass

# Delete a specific list
def list_delete(entity=None):
    datastore_client.delete(entity.key)

# Model to share lists between users
def user_list_user(owner_id=None, list_id=None, user_id=None):
    pass

