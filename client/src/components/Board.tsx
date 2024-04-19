interface BoardProps {
    board: {
        _id: string;
        title: string;
    };
    handleChooseBoard: (id: string) => void;
    current: string | null;
}

export default function Board({
    board,
    handleChooseBoard,
    current,
}: BoardProps) {
    const { _id, title } = board;

    return (
        <div
            onClick={() => handleChooseBoard(_id)}
            className={`board ${
                current === _id ? "text-white bg-blue-500" : ""
            }`}
        >
            <h2>{title}</h2>
        </div>
    );
}
