from django.shortcuts import render
from rest_framework.response import Response
from .services import get_best_moves

# Create your views here.
def analyze_position(request):
    fen = request.GET.get('fen')
    moves = get_best_moves(fen)
    return Response({'moves': moves})