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
        board = chess.Board(fen)
        
        # Check game end conditions first
        if board.is_checkmate():
            return Response({
                'game_over': True,
                'result': 'checkmate',
                'winner': 'white' if board.turn == chess.BLACK else 'black',
                'moves': []  # Keep consistent structure
            })
            
        if board.is_stalemate():
            return Response({
                'game_over': True,
                'result': 'stalemate',
                'winner': None,
                'moves': []
            })

        # Normal analysis
        raw_moves = get_best_moves(fen)
        moves = []
        for m in raw_moves:
            san = board.san(chess.Move.from_uci(m['Move']))
            moves.append({
                'san': san,
                'score': m['Centipawn'] / 100 if m['Centipawn'] 
                       else f"Mate in {abs(m['Mate'])}"
            })
        
        return Response({
            'game_over': False,
            'moves': moves
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)