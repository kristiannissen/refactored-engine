import unittest

from models import *


class TestModels(unittest.TestCase):

    def setUp(self):
        clear_all_users()
        clear_all_user_lists()

    def tearDown(self):
        pass

    def test_user_create(self):
        user = user_create(email='example@gmail.com')
        self.assertIsNotNone(user.id, 'Test user create')

    def test_user_get_not_found(self):
        user = user_get(email='example@gmail.com')
        self.assertIsNone(user, 'Test user get not found')

    def test_user_get_found(self):
        user_create(email='example@gmail.com')

        user = user_get(email='example@gmail.com')
        self.assertIsNotNone(user, 'Test user get found')

    def test_user_delete(self):
        test_user = user_create(email='example@gmail.com')
        self.assertIsNotNone(test_user.id, 'Test user create')

        user_delete(key=test_user.id)

        test_user = user_get(email='example@gmail.com')
        self.assertIsNone(test_user, 'Test user delete')

    def test_user_authenticate_found(self):
        user_create(email='example@gmail.com')

        user = user_authenticate(email='example@gmail.com')
        self.assertIsNotNone(user, 'Test user authenticate found')

    def test_user_authenticate_not_found(self):
        user = user_authenticate(email='example@gmail.com')
        self.assertIsNone(user, 'Test user authenticate not found')

    def test_user_list(self):
        user = user_create(email='example@gmail.com')
        user_list = user_lists(user_id=user.id)
        self.assertIsNone(user_list, 'Test user list')

    def test_user_list_create(self):
        user = user_create(email='example@gmail.com')
        user_list = list_create(list_name='Hello Kitty', user_id=user.id)
        self.assertIsNotNone(user_list, 'Test create user list')

    def test_list_update(self):
        user = user_create(email='example@gmail.com')

        user_list = list_create(list_name='Hello Kitty', user_id=user.id)
        first_list = user_lists(user_id=user.id)

        user_list = list_update(list_id=user_list.id,
                                list_data={'items': [{'name': 'Hello Kitty'}]})
        second_list = user_lists(user_id=user.id)

        self.assertNotEqual(first_list, second_list, 'Test list update')


if __name__ == '__main__':
    unittest.main()
