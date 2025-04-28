// Simple should just show page not found
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAF8F2]">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center space-y-6">
        <h1 className="text-4xl font-bold text-red-700">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 text-lg">
          Oops! The page you're looking for doesn’t exist or has been moved.
        </p>
        <button
          className="bg-[#7E9181] hover:bg-[#6d7e70] text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          onClick={handleGoHome}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
