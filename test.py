# import chess
# import stockfish

# def get_best_moves(fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", num_moves=5):
#     engine = stockfish.Stockfish(r"C:\stockfish\stockfish.exe", depth=5)

#     # Create a board from the FEN string
#     if not engine.is_fen_valid(fen):
#         return [{"error": "Invalid FEN"}]
#     engine.set_fen_position(fen)

#     # Returns the top num_moves
#     board = chess.Board(fen)
#     moves = engine.get_top_moves(num_moves)
#     print(type(moves[0]['Move']))
#     # for i, m in enumerate(moves):
#     #     moves[i]['Move'] = board.san(chess.Move.from_uci(m['Move']))
#     return moves

# moves = get_best_moves()

# print(moves)