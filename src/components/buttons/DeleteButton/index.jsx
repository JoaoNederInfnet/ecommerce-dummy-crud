/*CSS*/
import "./styles.css";
//========================================================

/*IMPORTS*/
import { FaRegTrashAlt } from "react-icons/fa";
//========================================================

/*COMPONENTE*/
export default function DeleteButton({productId, onDelete}) 
{  
  return (
    <div className="deleteButton">
      <button 
       type="button"
       onClick={(e) =>
       {
        e.stopPropagation();
        onDelete(productId);
       }}
      >
       <FaRegTrashAlt/>
      </button>
    </div>
  );
}