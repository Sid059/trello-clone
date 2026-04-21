import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard, deleteBoard } from '../features/boards/boardsSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../components/reusable/Button';
import Input from '../components/reusable/Input';

export default function Dashboard() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boards = useSelector(state => state.boards);
    const [newBoardTitle, setNewBoardTitle] = useState('');

    const boardList = boards.allIds.map(id => boards.byId[id]);

    const handleBoardTitleChange = ({ target }) => {
        setNewBoardTitle(target.value);
    }

    const handleKeyDown = ({ key }) => {
        if (key === 'Enter') {
            handleAddBoard();
        }
    }

    const handleAddBoard = () => {
        if (newBoardTitle.trim() === '') {
            alert('Please enter a title for the board');
            return;
        }

        dispatch(addBoard({ title: newBoardTitle }));
        setNewBoardTitle('');
    }

    const handleDeleteBoard = (boardId, event) => {
        event.stopPropagation(); 
        if (window.confirm('Are you sure you want to delete this board?')) {
            dispatch(deleteBoard({ id: boardId }));
        }
    }

    const handleSelectBoard = (boardId) => {
        navigate(`/board/${boardId}`);
    }

    const handleDeleteClick = (boardId) => (event) => {
        handleDeleteBoard(boardId, event);
    };

    const handleBoardClick = (boardId) => () => {
        handleSelectBoard(boardId);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    My Boards
                </h1>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Create New Board
                    </h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                value={newBoardTitle}
                                onChange={handleBoardTitleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter board title..."
                            />
                        </div>
                        <Button variant="primary" onClick={handleAddBoard}>
                            Add Board
                        </Button>
                    </div>
                </div>
                
                {boardList.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No boards yet. Create your first board above!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {boardList.map((board) => (
                            <div
                                key={board.id}
                                onClick={handleBoardClick(board.id)}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold text-gray-800 break-words flex-1 mr-2">
                                            {board.title}
                                        </h3>
                                        <Button
                                            variant="danger"
                                            onClick={handleDeleteClick(board.id)}
                                            className="text-sm px-2 py-1"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-2">
                                        {board.listIds?.length || 0} lists
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}