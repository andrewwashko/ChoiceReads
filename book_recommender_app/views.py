from django.shortcuts import render
from django.http import JsonResponse, HttpResponse


# Create your views here.
def sign_up(request):
  # POST logic to insert new record into user table 
  pass

def login(request):
  # POST logic to check db and authenticate user
  pass

def current_user(request):
  # GET logic once user is authenticated
  pass

def logout(request):
  # POST logic to logout user
  pass

def index(request):
  the_index = open("static/index.html")
  return HttpResponse(the_index)