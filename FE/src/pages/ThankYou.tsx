import { useNavigate } from "react-router-dom";


const ThankYou = () => {
  const history = useNavigate();

  const handleBackToHome = () => {
    history('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-center">
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Cảm ơn bạn đã ủng hộ</h1>
        <p className="text-gray-600 mb-8">Chúng tôi rất cảm kích sự ủng hộ của bạn.</p>
        <button
          className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none transition duration-300"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
