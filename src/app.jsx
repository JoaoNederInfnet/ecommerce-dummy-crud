/*CSS*/
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./stylesToastify.css";
//========================================================

/*IMPORTS*/
import {Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";
//========================================================

/*PASTAS DOS COMPONENTES USADOS*/
import Header from "./components/Header";
//========================================================

/*COMPONENTE*/
export default function App() 
{
  return (
    <div className="app">
      <Header/>

      <div className="content">
       <Outlet/>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        progress={undefined}
        theme="light"/>
      </div> 

    </div>
  );
}