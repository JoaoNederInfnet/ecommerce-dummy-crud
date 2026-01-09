/*CSS*/
import "./styles.css";
//========================================================

/*IMPORTS*/
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//========================================================

/*PASTAS DOS COMPONENTES USADOS*/
import { getProductById } from "../../services/productService";
import { createProduct } from "../../services/productService";
import { editProduct } from "../../services/productService";
import validatorYup from "../../utils/validatorYup";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Controller } from "react-hook-form";
//========================================================

/*COMPONENTE*/
export default function ProductForm() 
{
  /*DADOS*/
  //1)
  const {id} = useParams();
  //----------------------------------//--------------------------------
  //2) Para o estado da página
  const [isLoading, setIsLoading] = useState(true);
  //----------------------------------//--------------------------------
  //3)
  const navigate = useNavigate();
  //----------------------------------//--------------------------------
  //4) Para o formulário
  //a)
  const {
         reset,
         register,
         handleSubmit,
         control,
         formState: { errors },
        } = useForm (
                     {
                      defaultValues:
                      {
                       title: "",
                       description: "",
                       category: "",
                       price: "",
                       thumbnail: "",
                      },
                       resolver: yupResolver(validatorYup),
                     });        
  //========================================================
  
  /*MÉTODOS*/
  //1) GET
   useEffect(() => 
   {
    if(!id)
    {
     setIsLoading(false);
     return;
    }

    const fetchProduct = async () => 
    {
      setIsLoading(true);

      try 
      {
        const data = await getProductById(id);

        reset(
             {
              title: data.title,
              description: data.description,
              category: data.category,
              price: data.price,
              thumbnail: data.thumbnail,
             });
      } 
       catch (error) 
       {
        toast("Erro ao buscar as informações do produto", 
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
   }, [id, reset]);

   //----------------------------/--------------------------
   
   //2) PUT or POST
   const editOrCreateProduct = async(submitedForm) =>
   {
    try 
    {
      if(id)
      {
       await editProduct(id, submitedForm);
      }
       else
       {
        await createProduct(submitedForm);
       }

       toast(`Produto ${id ? "editado" : "criado"} com sucesso!`, 
       {
        toastId: "product-editOrCreate-success",
        className: "success",
       });

       navigate("/");
    } 
     catch (error) 
     {
      toast(`Erro ao ${id ? "editar as informações do" : "criar o"} produto`, 
      {
        toastId: "product-editOrCreate-error",
        className: "error",
      });
     }
   }
  //========================================================
  
  return (
    <div className="productForm">
      <h1>{id ? "Edição" : "Criação"} de produto</h1>
      
      {isLoading ? 
      (
       <p>Carregando formulário</p>
      ) : 
         (
          <form onSubmit={handleSubmit(editOrCreateProduct)}>
           <div>
             <input 
               {...register("title")} 
               placeholder="Informe o nome do produto"                              
            />
               <p className="validationErrorMessage">
                    {
                     errors.title?.message
                    }
               </p>
           </div>

           <div className="column">
             <div>
              <input 
               {...register("category")} 
               placeholder="Informe a categoria do produto"              
             />
               <p className="validationErrorMessage">
                    {
                     errors.category?.message
                    }
               </p>
             </div>
           
           <div>
             <input 
               {...register("price")} 
               placeholder="Informe o preço do produto"
             />
               <p className="validationErrorMessage">
                    {
                     errors.price?.message
                    }
               </p>
            </div>
           </div>

           <div>
             <input 
               {...register("thumbnail")} 
               placeholder="Informe a url da imagem do produto"
            />
               <p className="validationErrorMessage">
                    {
                     errors.thumbnail?.message
                    }
               </p>
           </div>

            <div>
              <Controller
                name="description"
                control={control}
                render={({field}) =>
                (
                  <ReactQuill
                   className="reactQuill"
                   theme="snow"
                   placeholder="Informe a descrição do produto"
                   {...field}
                   value={field.value || ""}
                   onChange={field.onChange}
                 />
                )}
              />
                <p className="validationErrorMessage">
                        {
                        errors.description?.message
                        }
                </p>
            </div>

           <div className="button">
             <button
               type="submit"
             >
               {
                id? "Salvar" : "Criar"
               }
             </button>
           </div>

          </form>
         )}
    </div>
  );
}