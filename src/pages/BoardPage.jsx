import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addList, deleteList } from '../features/lists/listsSlice';
import { addListToBoard, removeListFromBoard } from '../features/boards/boardsSlice';
import { generateId } from '../utils/generateId';

import Button from '../components/reusable/Button';
import Input from '../components/reusable/Input';
import ListColumn from '../features/lists/ListColumn';

import boardIcon from '../assets/icons/Board.png';

export default function BoardPage() {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [newListTitle, setNewListTitle] = useState('');

    const board = useSelector(state => state.boards.byId[boardId]);
    const lists = useSelector(state => state.lists);

    // FIXED: Added .filter(Boolean) to remove undefined values
    const boardLists = board?.listIds?.map(listId => lists.byId[listId]).filter(Boolean) || [];

    const handleBack = () => {
        navigate('/');
    };

    const handleAddList = () => {
        if (newListTitle.trim() === '') {
            alert('Please enter a list title');
            return;
        }

        const newListId = generateId();

        dispatch(addList({
            id: newListId,
            title: newListTitle,
            boardId: boardId
        }));

        dispatch(addListToBoard({
            boardId: boardId,
            listId: newListId
        }));

        setNewListTitle('');
    };

    const handleDeleteList = (listId) => {
        if (window.confirm('Are you sure you want to delete this list and all its cards?')) {
            dispatch(deleteList({ id: listId }));
            dispatch(removeListFromBoard({
                boardId: boardId,
                listId: listId
            }));
        }
    };

    const handleKeyDown = ({ key }) => {
        if (key === 'Enter') {
            handleAddList();
        }
    };

    const handleListTitleChange = ({ target }) => {
        setNewListTitle(target.value);
    };

    return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f1f2f4' }}>
        <div className="w-full">  {/* Changed from max-w-6xl mx-auto */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <img src={boardIcon} alt="Board" className="w-6 h-6 sm:w-8 sm:h-8" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {board?.title || 'Unknown Board'}
                    </h1>
                </div>
                <Button variant="secondary" onClick={handleBack} className="text-sm">
                    ← Back to Boards
                </Button>
            </div>

            <div className="bg-[#ebecf0] rounded-lg p-3 mb-6 inline-block min-w-[272px]">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            value={newListTitle}
                            onChange={handleListTitleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter list title..."
                            className="bg-white text-sm"
                        />
                    </div>
                    <Button variant="primary" onClick={handleAddList} icon="add">
                        Add List
                    </Button>
                </div>
            </div>

            {boardLists.length === 0 ? (
                <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">
                        No lists yet. Create your first list above!
                    </p>
                </div>
            ) : (
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 items-start">
                    {boardLists.map((list) => (
                        <ListColumn
                            key={list.id}
                            list={list}
                            onDeleteList={handleDeleteList}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
);
}