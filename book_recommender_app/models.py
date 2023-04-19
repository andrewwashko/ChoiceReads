from django.db import models
from django.contrib.auth.models import AbstractUser

class App_User(AbstractUser):
    email = models.EmailField(blank = False, null = False, unique = True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    def __str__(self):
      return f" Email: ${self.email}"