import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import styles from './Board.module.css';

interface ChessBoardProps {
    position: string;
    onPieceDrop: (source: string, target: string) => boolean;
    boardWidth?: number;
}

export default function ChessBoard({
    position,
    onPieceDrop,
    boardWidth = 500
}: ChessBoardProps) {
    const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');

    const flipBoard = () => {
        setBoardOrientation(prev => prev === 'white' ? 'black' : 'white');
    };

    return (
        <div className={styles.wrapper}>
            <Chessboard
                position={position}
                onPieceDrop={onPieceDrop}
                boardWidth={boardWidth}
                boardOrientation={boardOrientation}
                customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
            />

            <button onClick={flipBoard} className={styles.flipButton}>
                Flip Board
            </button>
        </div>
    );
}