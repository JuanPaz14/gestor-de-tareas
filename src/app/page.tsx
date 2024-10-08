"use client"; 

import {Route, Routes, BrowserRouter} from 'react-router-dom';

import './globals.css'; // Asegúrate de que este import esté presente
import { TaskManagerComponent } from "components/components/task-manager";
import {Contador} from 'components/components/contador';
export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskManagerComponent/>}/>
     
      </Routes>
    </BrowserRouter>
    

   
    
  );
}
