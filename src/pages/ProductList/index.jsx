/*CSS*/
import "./styles.css";
//========================================================

/*IMPORTS*/
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
//========================================================

/*PASTAS DOS COMPONENTES/MÉTODOS USADOS*/
import { getProducts } from "../../services/productService";
import { deleteProduct } from "../../services/productService";
import formatMoney from "../../utils/formatMoney";
import DeleteButton from "../../components/buttons/DeleteButton";
import EditButton from "../../components/buttons/EditButton";
import ComponentModal from "../../components/Modal";
//========================================================

/*COMPONENTE*/
export default function ProductList() 
{
  /*DADOS*/
  //1) Para a lista de produtos
  const [productList, setProductsList] = useState([]);
  //----------------------------------//--------------------------------
  //2) Para o estado da pagina
  const [isLoading, setIsLoading] = useState(true);
  //----------------------------------//--------------------------------
  //3) Para usar a navegação das routes
  const navigate = useNavigate();
  //----------------------------------//--------------------------------
  //4) Para definir o produto selecionado para realizar a ação
  const [productToActUpon, setProductToActUpon] = useState(null);
  //----------------------------------//--------------------------------
  //5) Para o modal 
  //a) Para conferir se está aberto
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //----------------------------/--------------------------
  //b) Para conferir se a ação relacionada está sendo realizada
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  //========================================================
  
  /*MÉTODOS*/
  //DE REQUISIÇÃO
  //1) GET
   useEffect(() => 
   {
    const fetchProducts = async () => 
    {
      setIsLoading(true);

      try 
      {
        const products = await getProducts();
        setProductsList(products);
      } 
       catch (error) 
       {
        toast("Erro ao buscar a lista de produtos", 
        {
          toastId: "products-error",
          className: "error",
        });
      } 
       finally 
       {
        setIsLoading(false);
       }
    };

    fetchProducts();
   }, []);
   //----------------------------/--------------------------
   
   //2) DELETE
    const deleteProductById = async(productId) =>
    {
     try
     {
      await deleteProduct(productId);

      setProductsList((prevList) =>
       prevList.filter((product) => product.id !== productId)
      );

      toast("Você deletou o produto com sucesso!", 
        {
          toastId: "product-delete-success",
          className: "success",
        });
     }
      catch(error)
      {
       toast("Erro ao deletar produto", 
        {
          toastId: "product-delete-error",
          className: "error",
        });
      }        
    };     
    //----------------------------------//--------------------------------

   //DE NAVEGACAO
   //1)
    const editProductById = async(productId) =>
    {
     try
     {      
      navigate("/novo/" + productId)
     }
      catch(error)
      {
       toast("Erro ao abrir janela de edição", 
        {
          toastId: "edit-window-error",
          className: "error",
        });
      }        
    }; 
   //----------------------------------//--------------------------------

   //DE HANDLING
   //1)
   function handleOpenEditModal(productId)
   {
    setProductToActUpon(productId);
    setModalIsOpen(true);
   }
   //----------------------------/--------------------------

   //2) handleOpenDeleteModal
   function handleOpenDeleteModal(productId)
   {
    setProductToActUpon(productId);
    setModalIsOpen(true);
   }

  //========================================================
  
  return (
    <div className="productList">
      <h1>Produtos</h1>

      {isLoading ? 
      (
       <p>Carregando produtos...</p>
      ) 
       : 
      (
       <div className="containerProducts">
        {productList.map((product) => 
        (
         <div 
          className="productCard"
          key={product.id}
          onClick={() => navigate("produtos/" + product.id)}
         >
          <div className="titleButtonContainer">
            <p>{product.title}</p>

            <EditButton
              productId={product.id}
              onEdit={handleOpenEditModal}
            />

            <DeleteButton
              productId={product.id}
              onDelete={handleOpenDeleteModal}   
            />
          </div>

          <img src={product.thumbnail}/>
          <p>{formatMoney(product.price)}</p>
         </div>
        ))}
        
        <ComponentModal
         modalIsOpen={modalIsOpen}
         setModalIsOpen={setModalIsOpen}
         actionString={"deletar"}
         actionFunction={deleteProductById}
         isLoadingAction={isLoadingAction}
         setIsLoadingAction={setIsLoadingAction}
         productToActUpon={productToActUpon}
         setProductToActUpon={setProductToActUpon}
         actionHappeningString={"Deletando"}
        />       

        <ComponentModal
         modalIsOpen={modalIsOpen}
         setModalIsOpen={setModalIsOpen}
         actionString={"editar"}
         actionFunction={editProductById}
         isLoadingAction={isLoadingAction}
         setIsLoadingAction={setIsLoadingAction}
         productToActUpon={productToActUpon}
         setProductToActUpon={setProductToActUpon}
         actionHappeningString={"Editando"}
        />                
       </div>       
      )}
    </div>
  );
}