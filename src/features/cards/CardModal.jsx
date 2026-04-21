import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCardTitle, updateCardDescription } from './cardsSlice';
import Modal from '../../components/reusable/Modal';
import Button from '../../components/reusable/Button';
import Input from '../../components/reusable/Input';

export default function CardModal({ isOpen, onClose, card }) {
    const dispatch = useDispatch();
    
    // Local state for editing
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    
    // When modal opens, copy card data to local state
    useEffect(() => {
        if (isOpen && card) {
            setEditTitle(card.title);
            setEditDescription(card.description || '');
        }
    }, [isOpen, card]);
    
    const handleTitleChange = ({ target }) => {
        const { value } = target;
        setEditTitle(value);
    };
    
    const handleDescriptionChange = ({ target }) => {
        const { value } = target;
        setEditDescription(value);
    };
    
    const handleSave = () => {
        if (editTitle.trim() !== '') {
            dispatch(updateCardTitle({ id: card.id, title: editTitle }));
        }
        dispatch(updateCardDescription({ id: card.id, description: editDescription }));
        onClose();
    };
    
    const handleCancel = () => {
        onClose();
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Card">
            <div className="space-y-4">
                {/* Title Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <Input
                        value={editTitle}
                        onChange={handleTitleChange}
                        placeholder="Card title..."
                    />
                </div>
                
                {/* Description Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={editDescription}
                        onChange={handleDescriptionChange}
                        placeholder="Add a more detailed description..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                {/* Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    );
}