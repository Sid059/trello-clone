import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard, updateCardTitle } from './cardsSlice';
import { removeCardFromList } from '../lists/listsSlice';
import Button from '../../components/reusable/Button';
import Input from '../../components/reusable/Input';

export default function Card({ card, listId }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(card.title);
    
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            dispatch(deleteCard({ id: card.id }));
            dispatch(removeCardFromList({ listId: listId, cardId: card.id }));
        }
    };
    
    const handleStartEdit = () => {
        setIsEditing(true);
        setEditTitle(card.title);
    };
    
    const handleSaveEdit = () => {
        if (editTitle.trim() !== '') {
            dispatch(updateCardTitle({ id: card.id, title: editTitle }));
        }
        setIsEditing(false);
    };
    
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditTitle(card.title);
    };
    
    const handleEditTitleChange = (e) => {
        setEditTitle(e.target.value);
    };
    
    const handleKeyDown = ({ key }) => {
        if (key === 'Enter') {
            handleSaveEdit();
        }
        if (key === 'Escape') {
            handleCancelEdit();
        }
    };
    
    return (
        <div className="bg-white rounded shadow p-3 mb-2 group">
            {isEditing ? (
                <div className="flex gap-2">
                    <Input
                        value={editTitle}
                        onChange={handleEditTitleChange}
                        onKeyDown={handleKeyDown}
                        className="flex-1"
                        autoFocus
                    />
                    <Button variant="primary" onClick={handleSaveEdit} className="text-sm px-2 py-1">
                        Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit} className="text-sm px-2 py-1">
                        Cancel
                    </Button>
                </div>
            ) : (
                <div className="flex justify-between items-start">
                    <p 
                        className="text-gray-700 flex-1 cursor-pointer hover:text-blue-600"
                        onClick={handleStartEdit}
                    >
                        {card.title}
                    </p>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        className="text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        Delete
                    </Button>
                </div>
            )}
            {card.description && (
                <p className="text-gray-400 text-xs mt-1">
                    {card.description.substring(0, 50)}
                    {card.description.length > 50 && '...'}
                </p>
            )}
        </div>
    );
}