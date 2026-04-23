import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard, deleteBoard } from '../features/boards/boardsSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../components/reusable/Button';
import Input from '../components/reusable/Input';

import dashboard from '../assets/icons/dashboard.png';

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
        <div className="min-h-screen p-8 bg-trello-pattern">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <img src={dashboard} alt="Boards" className="w-8 h-8" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            My Boards
                        </h1>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
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
                        <Button variant="primary" onClick={handleAddBoard} icon="add">
                            Add Board
                        </Button>
                    </div>
                </div>
                
                {boardList.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">
                            No boards yet. Create your first board above!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {boardList.map((board) => (
                            <div
                                key={board.id}
                                onClick={handleBoardClick(board.id)}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-200"
                            >
                                <div className="h-24 bg-gradient-to-r from-[#0079bf] to-[#c377e0]"></div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        {board.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-2">
                                        {board.listIds?.length || 0} lists
                                    </p>
                                    <Button
                                        variant="danger"
                                        onClick={handleDeleteClick(board.id)}
                                        className="text-xs px-2 py-1"
                                        icon="delete"
                                    >
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}