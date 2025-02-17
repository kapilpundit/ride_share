from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

# Create your tests here.

class AuthTests(APITestCase):
    def setUp(self):
        """Set up a test user for login tests."""
        
        self.user = User.objects.create_user(username="testuser", password="testpassword")

    def test_register_user(self):
        """Test user registration API."""
        
        url = "/api/register/"
        data = {"username": "newuser", "password": "newpassword"}

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="newuser").exists())

    def test_register_existing_user(self):
        """Test registration with an already existing username."""
        
        url = "/api/register/"
        data = {"username": "testuser", "password": "testpassword"}

        response = self.client.post(url, data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_valid_user(self):
        """Test login with valid credentials."""
        
        url = "/api/login/"
        data = {"username": "testuser", "password": "testpassword"}
        
        response = self.client.post(url, data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_invalid_user(self):
        """Test login with invalid credentials."""
        
        url = "/api/login/"
        data = {"username": "invaliduser", "password": "wrongpassword"}
        
        response = self.client.post(url, data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)