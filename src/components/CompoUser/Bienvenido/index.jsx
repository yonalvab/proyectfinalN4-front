import React from 'react'

export const Bienvenido = () => {
    return (
        <aside className=' h-[675px] bg-slate-500 flex justify-center items-center flex-col gap-6 ' >
            <h1 className=' text-[60px] font-bold text-white ' >¡BIENVENIDO!</h1>
            <button className=' bg-lime-500 flex items-center justify-center gap-2 w-48  h-14 rounded-full  ' >
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.27 200q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" /></svg>
                <h2 className=' text-white font-bold text-[25px] ' >Reporte</h2>
            </button>
        </aside>
    )
}