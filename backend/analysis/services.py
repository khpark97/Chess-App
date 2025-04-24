from typing import List
from django.conf import settings
import os

import stockfish

def get_best_moves(fen: str, num_moves: int = 3) -> List[dict]:
    """
    Analyzes a chess position and returns the top N best moves.
    
    Args:
        fen (str): The FEN string representing the board position
        num_moves (int): Number of best moves to return (default: 3)
    
    Returns:
        List[dict]: List of dictionaries containing move information
    """
    try:
        # Initialize the Stockfish engine
        if not os.path.exists(settings.STOCKFISH_PATH):
            return [{"error": f"Stockfish not found at {settings.STOCKFISH_PATH}"}]
        engine_path = settings.STOCKFISH_PATH
        engine = stockfish.Stockfish(engine_path, depth=5)

        # Create a board from the FEN string
        if not engine.is_fen_valid(fen):
            return [{"error": "Invalid FEN"}]
        engine.set_fen_position(fen)

        # Returns the top num_moves
        moves = engine.get_top_moves(num_moves)
        return moves

    except stockfish.StockfishException as e:
        return [{"error": "An unexpected error occurred: " + str(e)}]
