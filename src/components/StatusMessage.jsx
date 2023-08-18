const StatusMessage = ({ winner, isXNext, squares }) => {

    const noMovesLeft = squares.every((squareValue) => squareValue !== null);
    const nextPlayer = isXNext ? 'X' : 'O';

    const renderStatusMessage = () => {
        if (winner) {
            return <div>Winner is {winner}</div>
        }

        if (!winner && noMovesLeft) {
            return <div>You have tied</div>
        }

        if (!winner && !noMovesLeft) {
            return <div>
                Next player is{' '}
                <span className={isXNext ? 'text-green' : 'text-orange'} >
                    {nextPlayer}
                </span>
            </div>
        }

        return null;
    }

    return (
        <div className="status-message">
            {renderStatusMessage()}
        </div>
    )
}

export default StatusMessage