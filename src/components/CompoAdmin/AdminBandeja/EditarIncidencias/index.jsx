import React, { useState } from 'react';
import axios from 'axios';

const EditarIncidencia = ({ incidencia, onClose, onUpdate }) => {
    const [descripcion, setDescripcion] = useState(incidencia.descripcion);
    const [lugar, setLugar] = useState(incidencia.lugar);
    const [estado, setEstado] = useState(incidencia.estado);
    const [fechaReporte, setFechaReporte] = useState(incidencia.fecha_reporte);
    const [imagen, setImagen] = useState(incidencia.imagen);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);

        try {
            const response = await axios.patch(`http://localhost:3000/api/incidencias/updateincidencia/${incidencia.id}`, {
                descripcion,
                lugar,
                estado,
                fecha_reporte: fechaReporte,
                imagen
            });

            onUpdate(response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar la incidencia:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
            <div className='bg-white p-6 rounded'>
                <h2 className='text-2xl mb-4'>Editar Incidencia</h2>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Descripción:</label>
                    <input
                        type='text'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Lugar:</label>
                    <input
                        type='text'
                        value={lugar}
                        onChange={(e) => setLugar(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Estado:</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    >
                        <option value=''>Selecciona un estado</option>
                        <option value='no abierto'>🔴 No abierto</option>
                        <option value='en proceso'>🔵 En proceso</option>
                        <option value='solucionado'>🟢 Solucionado</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Fecha de Reporte:</label>
                    <input
                        type='text'
                        value={fechaReporte}
                        onChange={(e) => setFechaReporte(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Imagen:</label>
                    <input
                        type='text'
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                        onClick={onClose}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditarIncidencia;