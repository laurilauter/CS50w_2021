
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    
    
    #API routes
    path("read_post", views.read_post_view, name="read_post"),
    path("add_post", views.add_post_view, name="add_post"),
    path("edit_post/<postid>", views.edit_post_view, name="edit_post"),
    path("profile/<userid>", views.profile_view, name="profile"),
    path("following/<userid>", views.following_view, name="following"),
    path("like/<postid>", views.like_view, name="like"),
    path("follow/<userid>", views.follow_view, name="follow")

]
