const ErrorMessage = ({ message = 'Something went wrong.' }) => (
  <div className="text-center py-8 text-red-600">
    {message}
  </div>
);

export default ErrorMessage;
