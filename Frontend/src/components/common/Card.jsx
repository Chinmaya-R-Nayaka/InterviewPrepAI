const Card = ({ children, className = "" }) => {
    return (
        <div
            className={`
                bg-base-100
                border
                border-base-300
                rounded-2xl
                shadow-lg
                p-6
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Card;