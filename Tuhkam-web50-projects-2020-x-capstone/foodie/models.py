import datetime
from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    bio = models.TextField(blank = False, default="Here is some info about me.")
    
    def serialize(self):
        return {
                "id": self.id,
                "user": self.username,
                "email": self.email,
                "bio": self.bio,
            }



class Body(models.Model):
    app_user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="users_data", null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    weight = models.DecimalField(default=0, max_digits=4, decimal_places=1)
    calories = models.PositiveSmallIntegerField(default=0)

    def serialize(self):
        return {
            "id": self.id,
            "app_user": self.app_user.username,
            "timestamp": self.timestamp.strftime("%d %b %Y"),
            "weight": self.weight,
            "calories": self.calories,
        }

