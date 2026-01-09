/*CSS*/
import "./styles.css";
//========================================================

/*IMPORTS*/
import { Link } from "react-router-dom";
//========================================================

/*COMPONENTE*/
export default function Header() 
{
  return (
    <div className="header">
      <header>
      <h1>Dummy E-Commerce Admin</h1> 

       <nav>
         <Link className="link" to="/">Home</Link>
         <Link className="link" to="/novo">Criar Produto</Link>          
       </nav>
       
      </header>
    </div>
  );
}