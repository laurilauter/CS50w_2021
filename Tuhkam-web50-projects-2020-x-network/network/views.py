from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from django.core import serializers
from django.core.serializers import serialize
import json

from .models import User, Post


def index(request): #default all posts view
    print(request.user.username)
    print(request.user.id)
    return render(request, "network/index.html")


#API route
#@login_required
#read posts
def read_post_view(request):

    if request.method == 'GET':
        
        #get posts
        entries = Post.objects.order_by('-timestamp')

        #iterate over posts
        posts = []
        for i in entries:
            serialized_post = i.serialize()
            posts.append(serialized_post)

        #print(posts)
        


        #put together the API response
        data = {
                'posts': posts
                }
                
        return JsonResponse(data, safe=False, status=200)

    else:
        error = 'GET request expected'
        return JsonResponse(error, safe=False, status=400)






#API route for adding a post
@login_required
def add_post_view(request):

    if request.method == "POST":
        # add if method POST
        data = json.loads(request.body)
        author = data.get("author", "")
        content = data.get("content", "")
        post = Post(author=request.user,
                    content=content)
        post.save()

        return JsonResponse({"message": "Posted successfully."}, status=201)
    
    else:
        return JsonResponse({"error": "POST or PUT request expected."}, status=400)



@login_required
def edit_post_view(request, postid):


    if request.method == "PUT":

        data = json.loads(request.body)
        content = data.get("content", "")

        print(content)

        if request.user.id != data.get("author", ""):
            return JsonResponse({
                "error": f"User is different than author of post, edition is forbidden."
            }, status=403)
        
        print(data.get("author", ""))
        print(request.user.id)


        if content == "":
            return JsonResponse({"error": f"The field is empty, write something"}, status=400)
        
        post = Post.objects.get(id=postid)
        post.content = content
        post.save()

        print('edit saved')

        return JsonResponse({"message": "Edited successfully."}, status=201)

    else:
        return JsonResponse({"error": "PUT request expected."}, status=400)






#API route
#display a profile for whoever was clicked on
def profile_view(request, userid):

        if request.method == 'GET':

            if User.objects.filter(following=userid).exists():
                #Load post from user that was clicked on

                print('userid from JS: ' + userid)

                #this lists all the followers and following by name
                fb = User.objects.filter(following=userid)
                fbu = list(fb.values('id'))
                print('fbu: '+str(fbu))

                f = User.objects.filter(followers=userid)
                fu = list(f.values('id'))
                print(f)
                print('fu: ' + str(fu))
                
                
                current_user = request.user.id
                print('current user: ' + str(current_user))
                
                fa = User.objects.filter(followers=current_user).values_list('username',flat=True)
                print(fa)
                

                subject = str(User.objects.get(pk=userid))

                if subject in fa:
                    label = 'Unfollow'
                else:
                    label = 'Follow'
                print('Label: ' + label)


                #followers and following by amount
                followed_by = User.objects.filter(following=userid).count()
                print('Followed by amount: ' + str(followed_by))

                following = User.objects.filter(followers=userid).count()
                print('Following amount: ' + str(following))

                subject = str(User.objects.get(pk=userid))
                
                #post from profile subject
                entries = Post.objects.filter(author=userid).order_by('-timestamp')
                
                posts = []
                for i in entries:
                    serialized_post = i.serialize()
                    posts.append(serialized_post)
                    

                #put together the API response
                data = {
                        'label': label,
                        'followed_by': followed_by,
                        'following': following,
                        'subject': subject,
                        'followed_by_users': fbu,
                        'following_users': fu,
                        'posts': posts
                        }
                        
                return JsonResponse(data, safe=False, status=200)

            else:
                # use FILTER to show only posts of people that the user follows
                error = 'No such user'        
                return JsonResponse(error, safe=False, status=400)

        elif request.method == 'POST':
            return JsonResponse({"error": "GET request expected."}, status=400)

        else:
            return JsonResponse({"error": "GET request expected."}, status=400)







#API route
#who is following the logged in user?
# only when logged in
@login_required
def following_view(request, userid):

    if request.method == 'GET':
        print('userid is: ' + userid)

        #check if user with given id exists
        if User.objects.filter(id=userid).exists():

            #lookup this user from the followers
            f = User.objects.filter(followers=userid)
            fu = list(f.values('username', 'id'))
            for j in f:
                print('Following user: ' + str(j))
            

            #people the user follows (could use just f)
            following_users = User.objects.filter(followers=userid)
            #posts from people the user follows
            entries = Post.objects.filter(author_id__in=following_users).order_by('-timestamp')
            
            
            
            posts = []
            for i in entries:
                serialized_post = i.serialize()
                posts.append(serialized_post)
            

            #put together the API response
            data = {
                    'following_users': fu,
                    'posts': posts
                    }
                    
            return JsonResponse(data, safe=False, status=200)

        else:
            #No such user
            error = 'No such user'        
            return JsonResponse(error, safe=False, status=400)
            
    else:
        error = 'Bad request'
        return JsonResponse(error, safe=False, status=400)






#API route for following somebody
@login_required
def follow_view(request, userid):

    if request.method == "POST":
        # add if method POST

        data = json.loads(request.body)
        print(data)

        #user to be followed
        victim_id = data.get("victim", "")
        #print('I want to follow victim: ' + str(victim_id))
        victim_name = str(User.objects.get(pk=victim_id))
        #print('I want to follow victim: ' + str(victim_name))
        
        #follower
        follower_id = data.get("follower", "")
        #print('Im: ' + str(follower_id))
        follower_name = str(User.objects.get(pk=follower_id))
        #print('Im: ' + str(follower_name))
        
        #bring back the record where the follower follows the victim
        following_user_match = User.objects.filter(following=victim_id)

        #Check if the follower is the follower of victim
        if follower_name in str(following_user_match):
            #print('relationship exists, we can DELETE following')
            #delete fllwer relatioship
            stalker = User(id=follower_id)           
            victim = User(id=victim_id)
            stalker.following.remove(victim)

            message = f"{follower_name} STOPPED followimg {victim_name}!"
            #print(message)
            

        else:
            print('relationship does not exist, we can START following')
            #create follower relationship
            stalker = User(id=follower_id)           
            victim = User(id=victim_id)
            stalker.following.add(victim)

            message = f"{follower_name} STARTED followimg {victim_name} now!"
            #print(message)

        return JsonResponse({"message": message} , status=201)
    else:
        return JsonResponse({"error": "POST request expected."}, status=400)






#API route for like
@login_required
def like_view(request, postid):

    if request.method == "PUT":

        #get the user
        user = User.objects.get(pk=request.user.id)
        #get the post object by postid
        post = Post.objects.get(pk=postid)

        # Toggle following status
        if user in post.liker.all():
            post.liker.remove(user)
        else:
            post.liker.add(user)

        return JsonResponse({"Sucess": "Like state toggled."}, safe=False, status=200)

    else:
        return JsonResponse({"error": "PUT request expected."}, status=400)


#--------------- LOGIN STUFF BELOW -----------------


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
