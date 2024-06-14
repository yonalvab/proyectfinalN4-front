import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Formulario enviado");
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const response = await axios.post('http://localhost:3000/', {
                email,
                password
            });

            console.log("Respuesta del servidor:", response.data);

            const { token, data } = response.data;
            const { rol_id } = data

            localStorage.setItem('token', token);

            setMessage(response.data.message);
            setError('');

            // Redirigir según el rol_id
            if (rol_id === 2) {
                console.log("Navegando a /app/welcome");
                navigate('/app/welcome');
            } if (rol_id === 1) {
                console.log("Navegando a /app/welcome");
                navigate('/admin/welcomeadmin');
            } else {
                console.log("Usuario no tiene acceso a /app/welcome");
                setError('No tiene acceso a esta área.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Error desconocido al iniciar sesión.');
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex items-center">
                        <div className="w-6 h-6 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M146.67-160q-27 0-46.84-19.83Q80-199.67 80-226.67v-506.66q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33v506.66q0 27-19.83 46.84Q840.33-160 813.33-160H146.67ZM480-454.67 146.67-670v443.33h666.66V-670L480-454.67Zm0-66.66 330.67-212H150l330 212ZM146.67-670v-63.33V-226.67-670Z" />
                            </svg>
                        </div>
                        <label className="block text-gray-700">Usuario:</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <div className="w-6 h-6 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M220-80q-24.75 0-42.37-17.63Q160-115.25 160-140v-434q0-24.75 17.63-42.38Q195.25-634 220-634h70v-96q0-78.85 55.61-134.42Q401.21-920 480.11-920q78.89 0 134.39 55.58Q670-808.85 670-730v96h70q24.75 0 42.38 17.62Q800-598.75 800-574v434q0 24.75-17.62 42.37Q764.75-80 740-80H220Zm0-60h520v-434H220v434Zm260.17-140q31.83 0 54.33-22.03T557-355q0-30-22.67-54.5t-54.5-24.5q-31.83 0-54.33 24.5t-22.5 55q0 30.5 22.67 52.5t54.5 22ZM350-634h260v-96q0-54.17-37.88-92.08-37.88-37.92-92-37.92T388-822.08q-38 37.91-38 92.08v96ZM220-140v-434 434Z" />
                            </svg>
                        </div>
                        <label className="block text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                            <label className="ml-2 block text-gray-700">Recuérdame</label>
                        </div>
                        <div>
                            <a href="#" className="text-purple-600 hover:underline">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                <p className="mt-4 text-center">
                    ¿No tienes cuenta?
                    <Link to='/register'>
                        <span className="text-purple-600 hover:underline"> Regístrate</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;