import { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import Board from './components/Board/Board';
import Analysis from './components/Analysis/Analysis';
import GameOver from './components/GameOver/GameOver';
import './App.css';
import type { Move, GameOverState } from './types.ts';

export default function App() {
  const [game, setGame] = useState(new Chess());
  const [bestMoves, setBestMoves] = useState<Move[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState<GameOverState>({
    isOver: false,
    result: null,
    winner: null
  });

  const fetchBestMoves = useCallback(async (fen: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/analyze/?fen=${encodeURIComponent(fen)}`);
      const data = await response.json();

      if (data.game_over) {
        setGameOver({
          isOver: true,
          result: data.result,
          winner: data.winner
        });
        setBestMoves([]);
      } else {
        setGameOver({ isOver: false, result: null, winner: null });
        setBestMoves(data.moves || []);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setBestMoves([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const currentFen = game.fen();
  useEffect(() => {
    fetchBestMoves(game.fen());
  }, [currentFen, fetchBestMoves, game]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move) {
        setGame(new Chess(game.fen()));
        return true;
      }
    } catch (e) {
      console.warn("Invalid move:", e);
    }
    return false;
  };

  return (
    <div className="app-container">
      {gameOver.isOver && gameOver.result && (
        <GameOver
          result={gameOver.result}
          winner={gameOver.winner}
          onNewGame={() => {
            setGame(new Chess());
            setGameOver({ isOver: false, result: null, winner: null });
          }}
        />
      )}

      <Board
        position={game.fen()}
        onPieceDrop={onDrop}
      />

      <Analysis
        moves={bestMoves}
        isLoading={isLoading}
        currentTurn={game.turn()}
        onReset={() => {
          setGame(new Chess());
          setGameOver({ isOver: false, result: null, winner: null });
        }}
      />
    </div>
  );
}