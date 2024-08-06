
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import instance from '../apis';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await instance.post('/auth/forgot-password', { email });
            setMessage(response.data.message);
            toast.success("Gửi email thành công")
            setError('');
        } catch (err) {
            setError('Đã xảy ra lỗi');
            toast.error("Gửi email thất bại")
            setMessage('');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quên mật khẩu</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Gửi yêu cầu
                </button>
            </form>
            {/* {message && <p className="mt-4 text-blue-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>} */}
            <ToastContainer/>
        </div>
        
    );
};

export default ForgotPassword;
