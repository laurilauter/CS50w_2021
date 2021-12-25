from django.urls import path

from . import views



urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<str:title>", views.show_entry, name="show_entry"),
    path("search", views.search, name="search"),
    path("new_entry", views.new_entry, name="new_entry"),
    path("random_page", views.random_page, name="random_page"),
    path("wiki/edit/<str:title>", views.edit_entry, name="edit_entry")
]

