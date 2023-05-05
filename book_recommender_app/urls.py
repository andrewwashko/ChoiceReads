from django.urls import path
from . import views

urlpatterns = [
  path("", views.index, name="index"),
  path("api/user_authentication/", views.user_authentication, name="user_authentication"),
  path("api/user_recommendation/", views.user_recommendation, name="user_recommendation"),
]