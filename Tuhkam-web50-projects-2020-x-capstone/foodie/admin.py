from django.contrib import admin
from .models import User, Body

#put each model on a separate line
admin.site.register(User)
admin.site.register(Body)

