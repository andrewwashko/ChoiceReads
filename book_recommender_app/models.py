from django.db import models
from django.contrib.auth.models import AbstractUser

class App_User(AbstractUser):
  email = models.EmailField(blank = False, null = False, unique = True)
  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = []
  
  def __str__(self):
    return f"Email: {self.email}"
    
class Quote(models.Model):
  user_id = models.ForeignKey(App_User, on_delete=models.CASCADE)
  quote_text = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return f"Quote: {self.quote_text}"

class Recommendation(models.Model):
  quote_id = models.ForeignKey(Quote, on_delete=models.CASCADE)
  title = models.CharField(max_length=255)
  author = models.CharField(max_length=255)
  summary = models.TextField()
  date_published = models.CharField(max_length=255)
  google_books_link = models.CharField(max_length=255)
  
  def __str__(self):
    return f"Recommendation: {self.title}"
    