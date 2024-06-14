import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const FormIncidencia = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [lugar, setLugar] = useState("");
    const [imageninci, setImageninci] = useState(null);
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setImageninci(file);
        }
    };

    const handleSubmitInci = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token');
            return;
        }

        const formData = new FormData();
        formData.append("descripcion", descripcion);
        formData.append("lugar", lugar);
        formData.append("imagenInci", imageninci); // Aquí asumo que manejas la imagen con un input de tipo file

        try {
            const response = await axios.post("http://localhost:3000/api/incidencias/subirInci", formData, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en los headers
                }
            });

            console.log("Registro exitoso:", response.data);

            navigate('/app/bandeja');
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            // Aquí podrías manejar el error mostrando un mensaje al usuario
        }
    };


    return (
        <div className='flex justify-center items-center h-screen bg-edificios bg-cover '>
            <div className='bg-slate-500 bg-opacity-80 h-[600px] w-[1100px] p-8 flex justify-center gap-7 rounded-3xl '>
                <form onSubmit={handleSubmitInci}>
                    <div className=' w-[500px]  flex flex-col items-center justify-center ' >
                        <div className='flex flex-col mb-4 gap-2 '>
                            <label className='text-white font-normal' >Describe el problema que estas experimentando:</label>
                            <textarea className='w-[400px] h-[70px] p-2 rounded-xl ' placeholder='Por favor, se específico'
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='flex flex-col mb-4 gap-2 '>
                            <label className='text-white font-normal' >A donde debe ir la ayuda?</label>
                            <textarea className='w-[400px] h-[70px] p-2 rounded-xl ' placeholder='Escribe el piso y el departamento en el cual ocurre el problema'
                                value={lugar}
                                onChange={(e) => setLugar(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="file" className="flex flex-col justify-center w-[250px] h-[190px] border-2 border-dashed border-gray-300 items-center text-center p-5 text-gray-700 cursor-pointer">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Vista previa de la imagen" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <span>
                                            <svg
                                                xmlSpace="preserve"
                                                viewBox="0 0 184.69 184.69"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xmlns="http://www.w3.org/2000/svg"
                                                id="Capa_1"
                                                version="1.1"
                                                width="60px"
                                                height="60px"
                                            >
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
                              C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
                              C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
                              c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
                              c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
                              c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
                              c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
                              v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                                                                style={{ fill: '#010002' }}
                                                            ></path>
                                                        </g>
                                                        <g>
                                                            <path
                                                                d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
                              c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
                              L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
                              c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
                              C104.91,91.608,107.183,91.608,108.586,90.201z"
                                                                style={{ fill: '#FFFFFF' }}
                                                            ></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>
                                        <p className='text-white font-normal'>drag and drop your file here or click to select a file!</p>
                                    </>
                                )}
                            </label>
                            <input className="hidden" name="imagenInci" id="file" type="file" onChange={handleFileChange} />
                        </div>
                        <div>
                            <button
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out mt-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    className="w-5 h-5 mr-2 -ml-1"
                                >
                                    <path
                                        d="M12 4v12m8-8l-8 8-8-8"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    ></path>
                                </svg>
                                Enviar
                            </button>
                        </div>
                    </div>
                </form>
                <div className=' w-[500px] bg-slate-300 bg-opacity-70 flex flex-col items-center text-center justify-center ' >
                    <div className=' flex flex-col gap-6  ' >
                        <h1 className=' text-orange-600 font-bold text-[20px] ' >¿NECESITAS AYUDA?</h1>
                        <p className='w-[370px]' >para ayudarnos a ayudarte, brindanos estos datos requeridos para enviar la solicitud para solucinar este incidente.<br></br> Nos estaremos poniendo en contacto con usted lo mas pronto posible luego de que envie la solicitud y la ayuda vendra.<br></br> Gracias por su preferencia y disfrute de nuestro servicios.</p>
                        <div className='flex flex-col gap-2 ' >
                            <h1 className=' text-orange-600 font-bold text-[15px] '>Contactanos:</h1>
                            <div className='flex gap-4' >
                                <h1>correo: proyecto@gmail.com</h1>
                                <h1>telefono: 938441221</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};