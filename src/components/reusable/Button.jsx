export default function Button({ children, variant="primary", onClick, type = "button", disabled = false, icon = null }) {     // variant can be "primary", "secondary", "danger", etc. You can use it to apply different styles based on the button's purpose.
    
    const variantStyles = {
        primary: "bg-[#0079bf] hover:bg-[#026aa7] text-white",
        danger: "bg-[#eb5a46] hover:bg-[#c94531] text-white",
        secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    }
    
    const baseClasses = "px-2 py-1 rounded font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1";
    
    const variantStyle = variantStyles[variant] || variantStyles.primary;

    const combinedClasses = `${baseClasses} ${variantStyle}`;

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={combinedClasses}
        >
            {icon && (
                <span className="material-symbols-outlined text-base">
                    {icon}
                </span>
            )}
            {children}
        </button>
    )
}