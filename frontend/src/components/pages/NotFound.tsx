import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">Oops! The page you're looking for does not exist.</p>
      <Link to="/dashboard" className="text-[#007BFF] hover:text-[#45a049] underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
