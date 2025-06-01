const Loading = ({ message = 'Loading...' }) => (
  <div className="text-center py-8 text-gray-600 animate-pulse">
    {message}
  </div>
);

export default Loading;
