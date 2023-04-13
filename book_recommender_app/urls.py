from django.urls import path
from . import views

urlpatterns = [
  path("", views.index, name="index")
  # path("login/", views.login, name="login")
  # path("signup/", views.signup, name="signup")
  # path("current_user/", views.current_user, name="current_user")
  # path("logout/", views.logout, name="logout")
]