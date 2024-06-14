import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Headers = () => {
    const [infonombre, setInfonombre] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchNombre = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token)

                if (!token) {
                    console.error('No se encontró el token');
                    return;
                }

                const response = await axios.get('http://localhost:3000/myinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('Respuesta del servidor:', response.data);

                setInfonombre(response.data.nombre);
            } catch (error) {
                console.error('Error al obtener el nombre:', error);
                if (error.response) {
                    console.error('Respuesta del servidor:', error.response.data);
                }
            }
        };

        fetchNombre();
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    };

    return (
        <header className='bg-cyan-500 flex h-14 items-center justify-between pl-5'>
            <div className='flex gap-12 justify-center items-center'>
                <div>
                    <h1 className=' text-white text-[25px] font-bold ' >
                        SolutionFast
                    </h1>
                </div>
                <ul className='flex gap-5 items-center justify-center'>
                    <Link to='/app/welcome'>
                        <li className='text-white hover:bg-cyan-600 h-14 w-16 flex items-center justify-center hover:border-b-4 hover:border-white'>
                            <h2>Inicio</h2>
                        </li>
                    </Link>
                    <Link to='/app/bandeja'>
                        <li className='text-white hover:bg-cyan-600 h-14 w-20 flex items-center justify-center hover:border-b-4 hover:border-white'>
                            <h2>Bandeja</h2>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className='flex justify-center items-center gap-3 h-14 w-40 hover:bg-cyan-600'>
                <div onClick={openModal} className='flex items-center justify-center gap-4 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF">
                        <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.81-195q-57.81 0-97.31-39.69-39.5-39.68-39.5-97.5 0-57.81 39.69-97.31 39.68-39.5 97.5-39.5 57.81 0 97.31 39.69 39.5 39.68 39.5 97.5 0 57.81-39.69 97.31-39.68 39.5-97.5 39.5Zm.66 370Q398-80 325-111.5t-127.5-86q-54.5-54.5-86-127.27Q80-397.53 80-480.27 80-563 111.5-635.5q31.5-72.5 86-127t127.27-86q72.76-31.5 155.5-31.5 82.73 0 155.23 31.5 72.5 31.5 127 86t86 127.03q31.5 72.53 31.5 155T848.5-325q-31.5 73-86 127.5t-127.03 86Q562.94-80 480.47-80Zm-.47-60q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
                    </svg>
                    <h1 className='text-white'>{infonombre.toUpperCase()}</h1>
                </div>
                {modalOpen && (
                    <div className='absolute bg-white border border-gray-300 p-4 right-0 mt-16 rounded shadow-lg'>
                        <p className='text-gray-800'>¿Estás seguro que quieres cerrar sesión?</p>
                        <div className='flex justify-end mt-4'>
                            <button onClick={closeModal} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2'>Cancelar</button>
                            <button onClick={handleLogout} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'>Cerrar sesión</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};