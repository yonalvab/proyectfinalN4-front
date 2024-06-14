import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const AdminBienvenido = () => {
    const [infonombread, setInfonombread] = useState('');

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

                setInfonombread(response.data.nombre);
            } catch (error) {
                console.error('Error al obtener el nombre:', error);
                if (error.response) {
                    console.error('Respuesta del servidor:', error.response.data);
                }
            }
        };

        fetchNombre();
    }, []);
    return (
        <aside className='  bg-slate-500 flex justify-center items-center flex-col gap-6 h-screen bg-edificios bg-cover ' >
            <h1 className='text-[70px] font-bold text-white ' style={{ textShadow: '3px 3px 3px rgba(0,0,0,0.5)' }}>
                ¡BIENVENIDO {infonombread.toUpperCase()}!
            </h1>
            <div >
                <div className=' w-[750PX] h-[130px] text-center bg-orange-200 bg-opacity-70 p-6 rounded-2xl ' >
                    <h1 className=' text-slate-800 text-[16px] font-medium ' >“El compromiso individual con el esfuerzo colectivo es lo que hace que un equipo, una empresa, una sociedad y hasta una civilización funcionen”. — Vince Lombardi, director ejecutivo de la National Football League</h1>
                </div>
            </div>
        </aside>
    )
}