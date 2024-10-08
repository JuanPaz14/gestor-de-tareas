"use client"; 

import {useState} from 'react';

export function Contador(){
    const[contador,setContador] = useState(0);

    return (

        <div>
            <h1>{contador}</h1>
            <button onClick={()=>setContador(contador+1)}>aumentar</button>
            <button onClick={()=>setContador(contador-1)}>disminuir</button>
        </div>
    );
}