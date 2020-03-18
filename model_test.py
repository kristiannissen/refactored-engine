import unittest

from models import user_create, user_delete, user_get, user_authenticate, clear_all_users, clear_all_user_lists

class TestModels(unittest.TestCase):

    def setUp(self):
        clear_all_users()
        clear_all_user_lists()

    def tearDown(self):
        print('teardown')

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
        

if __name__ == '__main__':
    unittest.main()