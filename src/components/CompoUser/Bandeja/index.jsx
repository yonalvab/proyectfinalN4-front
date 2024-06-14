import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditInciUser from './EditInciUser'; // Asegúrate de importar correctamente el componente EditInciUser

export const Bandeja = () => {
    const [incidenciasUser, setIncidenciasUser] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [incidenciaActual, setIncidenciaActual] = useState(null);
    const [incidenciasFiltradasEstados, setIncidenciasFiltradasEstados] = useState([]);

    useEffect(() => {
        const fetchIncidenciasUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No se encontró el token');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/incidencias/misIncidentes', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setIncidenciasUser(response.data);
                setIncidenciasFiltradasEstados(response.data);
            } catch (error) {
                console.error('Error al obtener las incidencias:', error);
            }
        };

        fetchIncidenciasUser();
    }, []);

    const eliminarIncidencia = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/incidencias/deleteincidencia/${id}`);

            setIncidenciasUser(prevIncidencias => prevIncidencias.filter(incidencia => incidencia.id !== id));
            setIncidenciasFiltradasEstados(prevIncidencias => prevIncidencias.filter(incidencia => incidencia.id !== id));
        } catch (error) {
            console.error('Error al eliminar la incidencia:', error);
        }
    };

    const handleEstadoFilter = (estado) => {
        setFiltroEstado(estado);
        if (estado === "") {
            setIncidenciasFiltradasEstados(incidenciasUser);
        } else {
            setIncidenciasFiltradasEstados(incidenciasUser.filter(incidencia => incidencia.estado === estado));
        }
    };

    const handleEditar = (incidencia) => {
        setIncidenciaActual(incidencia);
    };

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col justify-center gap-4 mt-3'>
                <div className="mb-4">
                    <label htmlFor="estadoFilter" className="block text-gray-700 text-sm font-bold mb-2">
                        Filtrar por Estado:
                    </label>
                    <select
                        id="estadoFilter"
                        onChange={(e) => handleEstadoFilter(e.target.value)}
                        value={filtroEstado}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Todos</option>
                        <option value="no abierto">🔴 No abierto</option>
                        <option value="en proceso">🔵 En proceso</option>
                        <option value="solucionado">🟢 Solucionado</option>
                    </select>
                </div>
                <table className='border-4 w-[1270px]'>
                    <thead>
                        <tr>
                            <th className='border-r-2 border-t-2 text-center'>Estado</th>
                            <th className='border-r-2 border-t-2 text-center'>Nombre</th>
                            <th className='border-r-2 border-t-2 text-center'>Descripción</th>
                            <th className='border-r-2 border-t-2 text-center'>Lugar</th>
                            <th className='border-r-2 border-t-2 text-center'>Fecha de Reporte</th>
                            <th className='border-t-2 border-r-2 text-center'>Imagen</th>
                            <th className='border-t-2 text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidenciasFiltradasEstados.map((incidencia) => (
                            <tr key={incidencia.id} className='h-20'>
                                <td className='border-r-2 border-t-2 text-center'>
                                    {incidencia.estado === 'no abierto' && '🔴 No abierto'}
                                    {incidencia.estado === 'en proceso' && '🔵 En proceso'}
                                    {incidencia.estado === 'solucionado' && '🟢 Solucionado'}
                                </td>
                                <td className='border-r-2 border-t-2 text-center'>{incidencia.usuario_nombre}</td>
                                <td className='border-r-2 border-t-2 text-center'>{incidencia.descripcion}</td>
                                <td className='border-r-2 border-t-2 text-center'>{incidencia.lugar}</td>
                                <td className='border-r-2 border-t-2 text-center'>{incidencia.fecha_reporte}</td>
                                <td className='border-t-2 border-r-2 text-center'>
                                    <img src={incidencia.imagen ? `http://localhost:3000/path/to/images/${incidencia.imagen}` : 'https://via.placeholder.com/150'} alt="imagen" className="h-14 w-14" />
                                </td>
                                <td className='border-t-2  text-center'>
                                    <button onClick={() => handleEditar(incidencia)} className='bg-blue-500 text-white px-2 py-1 rounded'>
                                        Editar
                                    </button>
                                    <button onClick={() => eliminarIncidencia(incidencia.id)} className='bg-red-500 text-white px-2 py-1 rounded'>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {incidenciaActual && (
                    <EditInciUser
                        incidencia={incidenciaActual}
                        onClose={() => setIncidenciaActual(null)}
                        onUpdate={(actualizada) => {

                            setIncidenciasUser(prevIncidencias =>
                                prevIncidencias.map(inc =>
                                    inc.id === actualizada.id ? actualizada : inc
                                )
                            );

                            setIncidenciasFiltradasEstados(prevIncidencias =>
                                prevIncidencias.map(inc =>
                                    inc.id === actualizada.id ? actualizada : inc
                                )
                            );
                            setIncidenciaActual(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};