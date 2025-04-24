from django.test import SimpleTestCase
from analysis.services import get_best_moves

class AnalysisServiceTests(SimpleTestCase):
    def test_invalid_fen_returns_error(self):
        """Test that invalid FEN returns an error."""
        response = get_best_moves("8/8/8/8/8/8/8")  # Invalid FEN
        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]["error"], "Invalid FEN")

    def test_valid_fen_returns_three_moves(self):
        """Test that valid FEN returns three moves."""
        fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        result = get_best_moves(fen)
        self.assertEqual(len(result), 3)