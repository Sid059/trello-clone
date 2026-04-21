import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addList, deleteList } from '../features/lists/listsSlice';
import { addListToBoard, removeListFromBoard } from '../features/boards/boardsSlice';
import { generateId } from '../utils/generateId';

import Button from '../components/reusable/Button';
import Input from '../components/reusable/Input';
import ListColumn from '../features/lists/ListColumn';

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
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <Button variant="secondary" onClick={handleBack} className="mb-6">
                    ← Back to Boards
                </Button>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {board?.title || 'Unknown Board'}
                    </h1>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add New List</h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                value={newListTitle}
                                onChange={handleListTitleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter list title (e.g., To Do, In Progress, Done)..."
                            />
                        </div>
                        <Button variant="primary" onClick={handleAddList}>
                            Add List
                        </Button>
                    </div>
                </div>

                {boardLists.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">
                            No lists yet. Create your first list above!
                        </p>
                    </div>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-4">
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