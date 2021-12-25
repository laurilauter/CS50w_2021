from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'foodie'

urlpatterns = [
    #index view
    path('', views.index_view, name='index'),
    #for authenication
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    #api pathspath
    path('users', views.users_api, name='users_api'),
    path('profile', views.profile_view, name='profile'),
    path('profile/bio', views.bio_add_api, name='bio_add_api'),
    path('profile/info', views.profile_view_api, name='profile_api'),
    path('profile/food', views.food_info_api, name='food_api'),
    path('profile/weight', views.weight_add_api, name='weight_add_api'),
    path('profile/calories', views.calories_add_api, name='calories_add_api')

    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)