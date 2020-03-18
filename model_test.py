import unittest

from models import user_create, user_delete, user_get

class TestSum(unittest.TestCase):

    def test_sum(self):
        self.assertEqual(1+1, 2, 'First test')

    def test_user_create(self):
        user = user_create(email='kristian.nissen@gmail.com')
        self.assertIsNotNone(user.id, 'Test user create')

    def test_user_get_not_found(self):
        user = user_get(email='kristian.nissendd@gmail.com')
        self.assertIsNone(user, 'Test user get not found')

    def test_user_get_found(self):
        user = user_get(email='kristian.nissen@gmail.com')
        self.assertIsNotNone(user, 'Test user get found')

    def test_user_delete(self):
        pass
        

if __name__ == '__main__':
    unittest.main()