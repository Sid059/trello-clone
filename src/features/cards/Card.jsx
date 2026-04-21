import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard } from './cardsSlice';
import { removeCardFromList } from '../lists/listsSlice';
import Button from '../../components/reusable/Button';
import CardModal from './CardModal';
import MoveCardDropdown from './MoveCardDropdown';

export default function Card({ card, listId }) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this card?')) {
            dispatch(deleteCard({ id: card.id }));
            dispatch(removeCardFromList({ listId: listId, cardId: card.id }));
        }
    };
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleMoveComplete = () => {
        alert('Card moved successfully!');
    };
    
    return (
        <>
            <div 
                className="bg-white rounded shadow p-3 mb-2 group cursor-pointer hover:bg-gray-50 transition-colors"
            >
                <div 
                    onClick={handleOpenModal}
                    className="cursor-pointer"
                >
                    <p className="text-gray-700 font-medium">
                        {card.title}
                    </p>
                    {card.description && (
                        <p className="text-gray-400 text-xs mt-1">
                            {card.description.substring(0, 50)}
                            {card.description.length > 50 && '...'}
                        </p>
                    )}
                </div>
                
                <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-100">
                    <MoveCardDropdown 
                        card={card}
                        currentListId={listId}
                        onMoveComplete={handleMoveComplete}
                    />
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        className="text-xs px-2 py-1"
                    >
                        Delete
                    </Button>
                </div>
            </div>
            
            <CardModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                card={card}
            />
        </>
    );
}