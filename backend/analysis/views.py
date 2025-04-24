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
        board = chess.Board(fen)
        result = []
        for i, m in enumerate(moves):
            result.append({'move': m['Move'], 'score': m['Centipawn']})
            result[i]['move'] = board.san(chess.Move.from_uci(m['Move']))

            if m['Centipawn'] is not None:
                result[i]['score'] = m['Centipawn'] / 100
            else:
                result[i]['score'] = f"Mate in {m['Mate']}"
        
        return Response(result)  # Return the full analysis
    except Exception as e:
        return Response({'error': str(e)}, status=500)