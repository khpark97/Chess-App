# analysis/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import get_best_moves

import chess

@api_view(['GET'])
def analyze_position(request):
    fen = request.GET.get('fen')
    
    if not fen:
        return Response({'error': 'Missing FEN parameter'}, status=400)
    
    try:
        moves = get_best_moves(fen)

        return Response({'moves': moves})  # Return the full analysis
    except Exception as e:
        return Response({'error': str(e)}, status=500)