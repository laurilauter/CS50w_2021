import requests
import json
from datetime import datetime
from datetime import date
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth.mixins import LoginRequiredMixin

from django.core import serializers
from django.core.serializers import serialize

#import models
from .models import User, Body



def index_view(request): #default all posts view
    #print(request.user.username)
    #print(request.user.id)
    return render(request, "foodie/index.html")


#This displays the main profile page
@login_required
def profile_view(request):

    return render(request, "foodie/profile.html", {"message": "View a profile."})



#API routes
#Profile api route to get info for the main profile page
@login_required
def profile_view_api(request):

    if request.method == 'GET':

            #get general params for current user from DB
            params = Body.objects.filter(app_user=request.user).order_by('timestamp')
            body = []
            
            for i in params:
                serialized_params = i.serialize()
                body.append(serialized_params)
            #----------------------------------------------------------------
            #get today's weight and calories from DB, if there are any
            now = datetime.now() # current date and time
            today_is = now.strftime("%d %b %Y")
            
            #this time format is for query
            today = date.today()
            data_today = Body.objects.filter(timestamp__year=today.year, timestamp__month=today.month, timestamp__day=today.day).values()
            #print(today)
            #print(list(data_today))
  
            # compile json response
            data = {
                    'today': today_is,
                    'data_today': list(data_today),
                    'body': body
                    }

            return JsonResponse(data, safe=False, status=200)

    else:
        error = 'GET request expected'        
        return JsonResponse(error, safe=False, status=400)

#API ROUTE for adding/updating a bio


@login_required
def bio_add_api(request):

    if request.method == "POST":
        
        #update user bio
        data = json.loads(request.body)
        bio = data.get("bio", "")
        #print(bio)
        User.objects.filter(username=request.user).update(bio=bio)
  
        return JsonResponse({"message": "Posted successfully.", "bio": bio}, status=201)
    else:
        return JsonResponse({"error": "POST or PUT request expected."}, status=400)




#API ROUTE for getting Calories for food items

@login_required
def food_info_api(request):

    #if request is POST do the below stuff, i.e sending some food with POST
    if request.method == "POST":

        #get info from fetch and populate variable for external api request
        data = json.loads(request.body)
        query = data.get("food_item", "")
    
        #https://calorieninjas.com/api
        api_url = 'https://api.calorieninjas.com/v1/nutrition?query='
        response = requests.get(api_url + query, headers={'X-Api-Key': 'PYEJJslhDTcQs28OB4F8pw==vU94L2fCd6DNSGQA'})
        if response.status_code == requests.codes.ok:

            data = response.text
            #print(data)
            
            return JsonResponse(data, safe=False, status=200)
        else:
            # return an error response
            return JsonResponse(data, safe=False, status=400)
    else:
        return JsonResponse({"error": "POST or PUT request expected."}, status=400)   




#------- ADD DATA ROUTES --------
# --- ADD WEIGHT

@login_required
def weight_add_api(request):

    if request.method == "POST":
        #get or create approach
        today = date.today()

        data = json.loads(request.body)

        weight = data.get("weight", "")
        updated_values = {'weight': weight}

        obj, created = Body.objects.update_or_create(app_user=request.user, timestamp__year=today.year, timestamp__month=today.month, timestamp__day=today.day, defaults=updated_values)
        if created: 
            print('The object was created')
        else:
            print('The object was updated')

        return JsonResponse({"message": "Posted successfully."}, status=201)
    else:
        return JsonResponse({"error": "POST or PUT request expected."}, status=400)




# --- ADD CALORIES ---

@login_required
def calories_add_api(request):

    if request.method == "POST":
        #get or create
        today = date.today()

        data = json.loads(request.body)
        calories = int(data.get("calories", ""))

        updated_values = {'calories': calories}
        obj, created = Body.objects.update_or_create(app_user=request.user, timestamp__year=today.year, timestamp__month=today.month, timestamp__day=today.day, defaults=updated_values)
        if created: 
            print('The object was created')
        else:
            print('The object was updated')

        return JsonResponse({"message": "Posted successfully."}, status=201)
    
    else:
        return JsonResponse({"error": "POST or PUT request expected."}, status=400)





# --- GET A LIST OF USERS AND THEIR BIOS ---

@login_required
def users_api(request):

    if request.method == "GET":

        #get general params for current user from DB
        params = User.objects.all()
        user_data = []

        # serialize data
        for i in params:
            serialized_params = i.serialize()
            user_data.append(serialized_params)
            
        #print("user data-> " + str(user_data))


        # compile json response
        data = {
                'user_data': user_data
                }

        return JsonResponse(data, safe=False, status=200)

    else:
        return JsonResponse({"error": "GET request expected."}, status=400)




#--------------   Authenication  --------------

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("foodie:index"))
        else:
            return render(request, "foodie/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "foodie/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("foodie:index"))


def register(request):
    if request.method == "POST":
        #get username and email
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "foodie/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "foodie/register.html", {
                "message": "That username is already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("foodie:profile"))
    else:
        return render(request, "foodie/register.html")
    