import React from 'react'

export const DatosIncidentes = ({ id, nombre, descripcion, lugar, estado, fecha, imagen, onEdit, onDelete }) => {
    const handleEliminar = (e) => {
        e.stopPropagation();
        onDelete(id);
    };
    return (
        <>
            <tr onClick={onEdit} className=' h-20' >
                <td className=' border-r-2 border-t-2 text-center'>{estado}</td>
                <td className=' border-r-2 border-t-2 text-center '>{nombre}</td>
                <td className=' border-r-2 border-t-2 text-center'>{descripcion}</td>
                <td className=' border-r-2 border-t-2 text-center'>{lugar}</td>
                <td className=' border-r-2 border-t-2 text-center'>{fecha}</td>
                <td><img src={imagen} alt="Incidente" className="h-12 w-12" /></td>
                <td>
                    <button onClick={onEdit} className='bg-blue-500 text-white px-2 py-1 rounded'>
                        Editar
                    </button>
                    <button onClick={handleEliminar} className='bg-red-500 text-white px-2 py-1 rounded'>
                        Eliminar
                    </button>
                </td>
            </tr>
        </>
    )
}
