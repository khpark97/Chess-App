// src/components/GameOver/GameOver.tsx
import styles from './GameOver.module.css';

interface Props {
    result: "checkmate" | "stalemate"; // No null here since we only render when game is over
    winner: "white" | "black" | null;
    onNewGame: () => void;
}

export default function GameOver({ result, winner, onNewGame }: Props) {
    return (
        <div className={styles.overlay}>
            <h2>
                {result === "checkmate"
                    ? `Checkmate! ${winner?.toUpperCase()} wins!`
                    : result === "stalemate"
                        ? "Stalemate!"
                        : result === "insufficient"
                            ? "Draw by insufficient material!"
                            : ""}
            </h2>
            <button className={styles.button} onClick={onNewGame}>
                New Game
            </button>
        </div>
    );
}