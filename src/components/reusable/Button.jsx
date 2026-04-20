export default function Button({ children, variant="primary", onClick, type = "button", disabled = false }) {     // variant can be "primary", "secondary", "danger", etc. You can use it to apply different styles based on the button's purpose.
    
    const variantStyles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    }
    
    const baseClasses = "px-4 py-2 rounded font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantStyle = variantStyles[variant] || variantStyles.primary;

    const combinedClasses = `${baseClasses} ${variantStyle}`;

    return (
        <button 
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={combinedClasses}
        >
            {children}
        </button>
    )
}