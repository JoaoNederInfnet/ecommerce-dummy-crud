/*CSS*/
import "./styles.css";
//========================================================

/*IMPORTS*/
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
//========================================================

/*PASTAS DOS COMPONENTES/MÉTODOS USADOS*/
import { getProductById } from "../../services/productService";
import { deleteProduct } from "../../services/productService";
import formatMoney from "../../utils/formatMoney";
import DeleteButton from "../../components/buttons/DeleteButton";
import EditButton from "../../components/buttons/EditButton";
import ComponentModal from "../../components/Modal";
//========================================================

/*COMPONENTE*/
export default function ProductDetail() 
{
  /*DADOS*/
  //1) Para o produto
  const [product, setProduct] = useState();
  //----------------------------------//--------------------------------
  //2) Para passar o id da rota
  const {id} = useParams();
  //----------------------------------//--------------------------------
  //3) Para o estado da página
  const [isLoading, setIsLoading] = useState(true);
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
  //----------------------------------//--------------------------------
  //6)
  const navigate = useNavigate();
  //========================================================
  
  /*MÉTODOS*/
  //1) GET
   useEffect(() => 
   {
    const fetchProduct = async () => 
    {
      setIsLoading(true);

      try 
      {
        const data = await getProductById(id);
        setProduct(data);
      } 
       catch (error) 
       {
        toast("Erro ao buscar a lista de produtos", 
        {
          toastId: "product-error",
          className: "error",
        });
      } 
       finally 
       {
        setIsLoading(false);
       }
    };

    fetchProduct();
   }, [id]);

   //----------------------------/--------------------------
   
   //2) DELETE
    const deleteProductById = async(productId) =>
    {
     try
     {
      await deleteProduct(productId);

      toast("Você deletou o produto com sucesso!", 
        {
          toastId: "products-error",
          className: "success",
        });

      navigate("/");  
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
    //----------------------------/--------------------------
   
   //3) PUT
     const editProductById = async(productId) =>
    {
     try
     {
      await editProductById(productId);      

      toast("Você editou o produto com sucesso!", 
      {
        toastId: "products-error",
        className: "success",
      });

      navigate("/novo/" + productId);  
     }
      catch(error)
      {
       toast("Erro ao editar produto", 
        {
          toastId: "product-edit-error",
          className: "error",
        });
      }        
    }; 
   //----------------------------------//--------------------------------

   //DE HANDLING
   //1)
   function handleEdit(productId)
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
  <div className="productDetail">
    <h1>Produto</h1>

    {isLoading ? (
      <p>Carregando produto...</p>
    ) : (
      <div className="containerProduct">
        <div>
          <p>Nome: {product.title}</p>
         <div>
          <EditButton
              productId={product.id}
              onEdit={handleEdit}
            /> 

          <DeleteButton
            productId={product.id}
            onDelete={handleOpenDeleteModal}
          />
         </div> 
        </div>

          <img src={product.thumbnail} />
          <p>Categoria: {(product.category)}</p>
          <p>Preço: {formatMoney(product.price)}</p>
          <p>Descrição: {(product.description)}</p>

      </div>
    )}

    <ComponentModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      actionString={"deletar"}
      requisitionFunction={deleteProductById}
      isLoadingAction={isLoadingAction}
      setIsLoadingAction={setIsLoadingAction}
      productToActUpon={productToActUpon}
      setProductToActUpon={setProductToActUpon}
      actionHappeningString={"Deletando"}
    />
  </div>
)}