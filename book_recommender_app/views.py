import os
import json
from dotenv import load_dotenv
from django.contrib.auth import logout
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .prompt import messages
from .utilities import *

load_dotenv()

""" User Authentication """

@api_view(['POST', 'PUT', 'GET'])
def user_authentication(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
          try:
            # purges authorization header (i.e. sessionid cookie) from request
            logout(request)
            return JsonResponse({"sign_out": True})
          except Exception as e:
            print(e)
            return JsonResponse({"sign_out": False})     
        else:
            return sign_up(request)
          
    elif request.method == 'PUT':
        return sign_in(request)
    
    elif request.method == 'GET':
        return current_user(request)
      
      
""" User Recommendation """

@api_view(["POST", "GET"])
def user_recommendation(request):
  if request.method == 'POST':
    if 'recommendation_pk' in request.data.keys():
      return delete_recommendation(request)
    
    elif 'quote_pk' in request.data.keys():
      return delete_quote(request)
    
    else:
      try: 
        # import API keys
        openai.api_key = os.environ['openai_key']
        google_books_api_key = os.environ['google_books_key']

        # retrieve correct user from db to establish link
        user_email = request.data["user_email"]
        user = App_User.objects.get(email=user_email)
        
        quote_text = request.data["quote"]
        user_message = {"role": "user", "content": quote_text}
        # take the imported prompt and copy it, so it can be manipulated by user input
        messages_without_quote = messages.copy()
        messages_with_quote = messages_without_quote + [user_message]
        
        # make OpenAI API call
        conversational_response, system_response = get_recommendations(messages_with_quote)

        # If system_response is None, return an error message to the front-end
        if system_response is None:
          return JsonResponse({ "data": "An error occurred. Revise your quote or provide additional context to it." })

        # create object to send to front-end
        user_facing_recommendations = {
          "data" : conversational_response
        }
        
        # Format and deserialize the system_response to a list of dictionaries
        # print(system_response)
        system_data = json.loads(system_response)

        # make Google Books API to get a link for each recommendation
        for recommendation in system_data:
          title = recommendation["title"]
          author = recommendation["author"]
          book_data = get_book(title, author, google_books_api_key)

          if book_data:
              google_books_link = book_data["volumeInfo"]["canonicalVolumeLink"]
              recommendation["google_books_link"] = google_books_link
          else:
              recommendation['google_books_link'] = "Not available on Google Books."
                
        # Save all info to the database
        # print(system_response)
        save_records(request.user, quote_text, system_data)
        
        return JsonResponse(user_facing_recommendations)
      except Exception as e:
        print("OpenAI API error:", e)
        return JsonResponse({ "success": False, "error": "An error occurred. Please try resubmitting your quote." })
    
  elif request.method == 'GET':
    return user_recommendation_history(request)


""" React + Django Link """
def index(request):
  the_index = open("static/index.html")
  return HttpResponse(the_index)

