import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    // Handle Escape key press
    useEffect(() => {
        const handleEscape = ({ key }) => {
            if (key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);

            //When a modal is open, users can still scroll the background page (the board behind the modal). This creates a bad user experience.
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);

            //Normal page behavior returns when modal is closed
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);  // useEffect needs to know when to add or remove event listener for Escape key, so we include isOpen and onClose in the dependency array.

    // Don't render anything if modal is closed
    if (!isOpen) return null;

    // // Handle overlay click (closing modal when clicking background)
    // const handleOverlayClick = ({ target }) => {
    //     if (target === target.currentTarget) {
    //         onClose();
    //     }
    // };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl leading-none"
                    >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    
                    </button>
                </div>

                {/* Content */}
                <div className="mb-4">
                    {children}
                </div>
            </div>
        </div>
    );
}