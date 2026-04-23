import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveCardToList } from './cardsSlice';
import { removeCardFromList, addCardToList } from '../lists/listsSlice';
import Button from '../../components/reusable/Button';

export default function MoveCardDropdown({ card, currentListId, onMoveComplete }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const boards = useSelector(state => state.boards);
    const lists = useSelector(state => state.lists);
    
    // Get current board ID from the card's list
    const currentList = lists.byId[currentListId];
    const boardId = currentList?.boardId;
    const board = boards.byId[boardId];
    
    // Get all lists in the current board
    const boardLists = board?.listIds?.map(listId => lists.byId[listId]).filter(Boolean) || [];
    
    const handleMove = (destinationListId) => {
        // Remove card from source list
        dispatch(removeCardFromList({
            listId: currentListId,
            cardId: card.id
        }));
        
        // Add card to destination list
        dispatch(addCardToList({
            listId: destinationListId,
            cardId: card.id
        }));
        
        // Update card's listId
        dispatch(moveCardToList({
            cardId: card.id,
            newListId: destinationListId
        }));
        
        setIsOpen(false);

        if (onMoveComplete) onMoveComplete();
    };
    
    return (
        <div className="relative">
            <Button
                variant="secondary"
                onClick={() => setIsOpen(!isOpen)}
                className="text-xs px-1 py-0.5"
                icon="arrow_drop_down"
            >
                {/* Move */}
            </Button>
            
            {isOpen && (
                <>
                    {/* Click outside to close */}
                    <div 
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Dropdown menu */}
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[150px]" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        <div className="py-1">
                            <div className="px-3 py-1 text-xs font-semibold text-gray-500 border-b">
                                Move to...
                            </div>
                            {boardLists.map(list => (
                                <button
                                    key={list.id}
                                    onClick={() => handleMove(list.id)}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                                        list.id === currentListId ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                                    }`}
                                    disabled={list.id === currentListId}
                                >
                                    {list.title}
                                    {list.id === currentListId && " (current)"}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}