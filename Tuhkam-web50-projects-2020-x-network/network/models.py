from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField("User", related_name='followers')

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "following": self.following,
            "follower": self.follower
        }

        

class Post(models.Model): #model for posts
    author = models.ForeignKey("User", on_delete=models.CASCADE, related_name="users_posts")
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    liker = models.ManyToManyField("User", related_name='who_liked')
    
    def serialize(self):
        return {
            "id": self.id,
            "author_id":self.author.id,
            "author": self.author.username,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "content": self.content,
            "likes": self.liker.count(),
            "liker": [u.username for u in self.liker.all()]
        }
