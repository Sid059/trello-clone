export default function Input({ type="text", placeholder="", value, onChange, className="", onKeyDown }){
    const baseClasses =  [
        "w-full",           // Full width of container
        "px-3",            // Horizontal padding
        "py-2",            // Vertical padding
        "border",          // Border around input
        "border-gray-300", // Light gray border color
        "rounded-md",      // Slightly rounded corners
        "focus:outline-none",      // Remove default focus outline
        "focus:ring-2",           // Add custom focus ring
        "focus:ring-blue-500",    // Make ring blue
        "focus:border-transparent" // Hide border on focus (show only ring)
    ].join(" ");  // Join array into a single string with spaces

    const combineClasses = `${baseClasses} ${className}`;

    return (
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={combineClasses}
            onKeyDown={onKeyDown}
        />
    )
}