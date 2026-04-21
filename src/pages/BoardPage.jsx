import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addList, deleteList } from '../features/lists/listsSlice';
import { addListToBoard, removeListFromBoard } from '../features/boards/boardsSlice';
import { generateId } from '../utils/generateId';

import Button from '../components/reusable/Button';
import Input from '../components/reusable/Input';


export default function BoardPage() {
  const { boardId } = useParams();  // Get boardId from URL
  
  const boardTitle = useSelector(state => state.boards.byId[boardId]?.title) || 'Unknown Board';
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const board = useSelector(state => state.boards.byId[boardId]);
  
  const lists = useSelector(state => state.lists);

  const boardLists = board?.listIds?.map(listId => lists.byId[listId]) || [];

  const [newListTitle, setNewListTitle] = useState('');
  
  const handleBack = () => {
    navigate('/');  // Go back to Dashboard
  };

  const handleAddList = () => {
    if(newListTitle.trim() === ''){
      alert('Please enter a list title');
      return;
    }

    //Generate a newListId
    const newListId = generateId();

    //Dispatch to listSlice
    dispatch(addList({
      id: newListId,
      title: newListTitle,
      boardId: boardId
    }))

    //Dispatch to boardSlice to add list to lisIds array
    dispatch(addListToBoard({
      boardId: boardId,
      listId: newListId
    }))

    setNewListTitle('');
  }

  const handleDeleteList = (listId) => {
    if(window.confirm('Are you sure you want to delete this list and all its cards?')){
      dispatch(deleteList({ id: listId }));

      dispatch(removeListFromBoard({
        boardId: boardId, 
        listId: listId 
      }));
    }
  }

  const handleKeyDown = ({key}) => {
    if(key === 'Enter'){
      handleAddList();
    }
  }

  const handleOnChange = ({target}) => {
    const { value } = target;
    setNewListTitle(value);
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Button variant="secondary" onClick={handleBack} className="mb-6">
                ← Back to Boards
            </Button>
            
            {/* Board Title */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    {board?.title || 'Unknown Board'}
                </h1>
            </div>
            
            {/* Add List Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New List</h2>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            value={newListTitle}
                            onChange={handleOnChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter list title (e.g., To Do, In Progress, Done)..."
                        />
                    </div>
                    <Button variant="primary" onClick={handleAddList}>
                        Add List
                    </Button>
                </div>
            </div>
            
            {/* Lists Grid (Columns) */}
            {boardLists.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">
                        No lists yet. Create your first list above!
                    </p>
                </div>
            ) : (
                <div className="flex gap-6 overflow-x-auto pb-4">
                    {boardLists.map((list) => (
                        <div key={list.id} className="bg-gray-200 rounded-lg p-4 min-w-[280px]">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-gray-800">
                                  {list.title}
                              </h3>
                              <Button 
                                  variant="danger" 
                                  onClick={() => handleDeleteList(list.id)}
                                  className="text-sm px-2 py-1"
                              >
                                  Delete
                              </Button>
                          </div>
                          <p className="text-gray-500 text-sm">
                              {list.cardIds?.length || 0} cards
                          </p>
                          <Button variant="secondary" className="mt-3 w-full">
                              + Add Card
                          </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}
