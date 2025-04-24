from django.db import models

# Create your models here.
class Game(models.Model):
    fen = models.CharField(max_length=100, default="startpos")