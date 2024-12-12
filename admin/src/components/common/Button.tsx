interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      className={`px-4 py-2 rounded-md ${variants[variant]} disabled:opacity-50`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-white"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
