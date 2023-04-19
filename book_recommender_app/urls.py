from django.urls import path
from . import views

urlpatterns = [
  path("", views.index, name="index"),
  path("api/sign_up/", views.sign_up, name="sign_up"),
  path("api/sign_in/", views.sign_in, name="sign_in"),
  path("api/current_user/", views.current_user, name="current_user"),
  path("api/sign_out/", views.sign_out, name="sign_out")
]