interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className={`p-4 rounded-md ${colors[type]}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
}
