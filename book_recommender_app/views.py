from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import *
from django.core.serializers import serialize
import json

""" User Authentication """

# POST logic to insert new record into user table 
@api_view(["POST"])
def sign_up(request):
  email = request.data["email"]
  password = request.data["password"]
  super_user = False
  staff = False
  if 'super' in request.data:
      super_user = request.data['super']
  if 'staff' in request.data:
      staff = request.data['staff']
  try:
    # create_user() auto-hashes password
    new_user = App_User.objects.create_user(username = email, email = email, password = password, is_superuser = super_user, is_staff = staff)
    new_user.save()
    return JsonResponse({"success": f"${email} was created."})
  except Exception as e:
    print(e)
    return JsonResponse({"success": False})

# POST logic to check db and authenticate user
@api_view(["POST"])
def sign_in(request):
  email = request.data["email"]
  password = request.data["password"]
  user = authenticate(username = email, password = password)
  # once user is authenticated, they need to login
  if user is not None and user.is_active:
    try:
      # request._request passes in a WSGI request, not a QuerySet request like normal django rest framework
      # generates csrftoken and sessionid cookies
      login(request._request, user)
      return JsonResponse({'email': user.email})
    except Exception as e:
      print(e)
      return JsonResponse({"sign_in": False})
  # makes sure something is returned if conditional fails  
  return JsonResponse({"sign_in": False})

# GET logic once user is logged in
@api_view(["GET"])
def current_user(request):
  if request.user.is_authenticated:
    # serialize takes db query data (i.e. QuerySet) and makes it readable via json
    # json.loads accesses the json object
    # **options (see def of serialize()) are the keys from the object passed in. "fields" variable is necessary syntax/variable name
    user_info = serialize("json", [request.user], fields = ["email"])
    user_info_workable = json.loads(user_info)    
    # user_info[0] digs into first elem of list, but slightly unnecessary because list will always have 1 elem. QoL though, one level is already dug into
    return JsonResponse(user_info_workable[0]["fields"])
  else: 
    return JsonResponse({"user": None})


# POST logic to logout user
def sign_out(request):
  try:
    # purges authorization header (i.e. sessionid cookie) from request
    logout(request)
    return JsonResponse({"sign_out": True})
  except Exception as e:
    print(e)
    return JsonResponse({"sign_out": False})

""" Quote + Recommendation """


""" React + Django Link """
def index(request):
  the_index = open("static/index.html")
  return HttpResponse(the_index)

