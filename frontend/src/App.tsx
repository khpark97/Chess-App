import { useState, useEffect, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

export default function App() {
  const [game, setGame] = useState(new Chess());
  const [bestMoves, setBestMoves] = useState<Array<{ Move: string, Centipawn: number | null, Mate: number | null }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized fetch function
  const fetchBestMoves = useCallback(async (fen: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/analyze/?fen=${encodeURIComponent(fen)}`);
      const data = await response.json();
      setBestMoves(data["moves"] || []);
    } catch (error) {
      console.error('Analysis failed:', error);
      setBestMoves([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch moves when FEN changes
  const currentFen = game.fen();
  useEffect(() => {
    fetchBestMoves(currentFen);
  }, [currentFen, fetchBestMoves, game]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move) {
        setGame(new Chess(game.fen())); // Create new instance to trigger re-render
        return true;
      }
    } catch (e) {
      console.warn("Invalid move:", e);
    }
    return false;
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div style={{ width: '500px' }}>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardWidth={500}
        />
      </div>

      <div style={{ minWidth: '200px' }}>
        <h3>Engine Analysis</h3>
        {isLoading ? (
          <p>Calculating...</p>
        ) : (
          <ol>
            {[...bestMoves]
              .sort((a, b) => {
                // Handle mate scores (they should be at the top)
                if (a.Mate !== null && b.Mate !== null) return a.Mate - b.Mate;
                if (a.Mate !== null) return -1;
                if (b.Mate !== null) return 1;
                // Sort by Centipawn if both moves have Centipawn values
                return (b.Centipawn ?? 0) - (a.Centipawn ?? 0);
              })
              .map((m, index) => (
                <li key={index}>
                  {m.Move} -
                  {m.Centipawn !== null
                    ? ` ${m.Centipawn / 100}`
                    : ` Mate in ${m.Mate!}`}
                </li>
              ))}
          </ol>
        )}
        <button
          onClick={() => {
            setGame(new Chess()) // Reset board
          }}
          style={{ marginTop: '10px' }}
        >
          Reset Board
        </button>
      </div>
    </div>
  );
}