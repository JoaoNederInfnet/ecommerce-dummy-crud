/*CSS*/
import "./styles.css";
//========================================================

/*IMPORTS*/
import { MdOutlineEdit } from "react-icons/md";
//========================================================

/*COMPONENTE*/
export default function EditButton({productId, onEdit}) 
{
  return (
    <div className="editButton">
      <button 
       type="button"
       onClick={(e) =>
       {
        e.stopPropagation();
        onEdit(productId);
       }}
      >
       <MdOutlineEdit/>
      </button>
    </div>
  );
}