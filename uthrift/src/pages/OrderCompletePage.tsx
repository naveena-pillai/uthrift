import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'


const OrderCompletePage = () => {
    const { width, height } = useWindowSize()

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
             <Confetti
                width={width}
                height={height} />
            <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center space-y-6">
                <h1 className="text-3xl font-bold text-green-700">Your Order is Complete!</h1>
                <p className="text-gray-600 text-lg">
                    Thank you for your order! It’s being processed and will be completed within 3–6 hours.
                    You’ll receive an email confirmation once it’s done.
                </p>
                <button className="bg-[#7E9181] hover:bg-[#6d7e70] text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};
export default OrderCompletePage;