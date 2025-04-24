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
    return (
        <div className={styles.container}>
            <Chessboard
                position={position}
                onPieceDrop={onPieceDrop}
                boardWidth={boardWidth}
                customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
            />
        </div>
    );
}