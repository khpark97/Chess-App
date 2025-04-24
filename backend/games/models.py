from django.db import models

# Create your models here.
class Game(models.Model):
    fen = models.CharField(
        max_length=100,
        default="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    )
    created_at = models.DateTimeField(auto_now_add=True)