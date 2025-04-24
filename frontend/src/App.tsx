import { useState, useEffect, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

export default function App() {
  const [game, setGame] = useState(new Chess());
  const [bestMoves, setBestMoves] = useState<Array<{ move: string, score: number | string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized fetch function
  const fetchBestMoves = useCallback(async (fen: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/analyze/?fen=${encodeURIComponent(fen)}`);
      const data = await response.json();
      setBestMoves(data || []);
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
            {[...bestMoves].map((m, index) => {
              // Determine whose turn it is: 'w' for white, 'b' for black
              const turn = game.turn();
              const bgColor = turn === 'w' ? '#ffffff' : '#000000';
              const color = turn === 'w' ? '#000000' : '#ffffff';
              return (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      background: bgColor,
                      color,
                      borderRadius: '6px',
                      padding: '2px 8px',
                      fontWeight: 600,
                      fontFamily: 'monospace',
                      display: 'inline-block',
                      minWidth: '32px',
                      textAlign: 'center'
                    }}
                  >
                    {m.score}
                  </span>
                  {m.move}
                </li>
              );
            })}
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