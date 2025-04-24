import styles from './Analysis.module.css';

interface Move {
    san: string;
    score: number | string;
}

interface AnalysisPanelProps {
    moves: Move[];
    isLoading: boolean;
    currentTurn: 'w' | 'b';
    onReset: () => void;
}

export default function AnalysisPanel({
    moves,
    isLoading,
    currentTurn,
    onReset
}: AnalysisPanelProps) {
    return (
        <div className={styles.panel}>
            <h3 className={styles.header}>Engine Analysis</h3>

            {isLoading ? (
                <p>Calculating...</p>
            ) : (
                <ol className={styles.moveList}>
                    {moves.map((move, index) => (
                        <li key={index} className={styles.moveItem}>
                            <span
                                className={`${styles.scoreBox} ${currentTurn === 'w' ? styles.scoreWhite : styles.scoreBlack
                                    }`}
                            >
                                {move.score}
                            </span>
                            <span>{move.san}</span>
                        </li>
                    ))}
                </ol>
            )}

            <button
                className={styles.resetButton}
                onClick={onReset}
            >
                Reset Board
            </button>
        </div>
    );
}