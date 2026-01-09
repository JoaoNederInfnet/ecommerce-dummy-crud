/*IMPORTS*/
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//========================================================

/*PASTAS DOS COMPONENTES USADOS*/
import ProductDetail from "../pages/ProductDetail";
import ProductForm from "../pages/ProductForm";
import ProductList from "../pages/ProductList";
import App from "../app";
//========================================================

const router = createBrowserRouter
([
  {
    path: "/",
    element: <App/>,
    children:
    [   
        {
         index: true, 
         element: <ProductList />,
        },
        
        {
         path: "novo", 
         element: <ProductForm />,
        },
        
        {
         path: "novo/:id", 
         element: <ProductForm />,
        },

        {
         path: "produtos/:id", 
         element: <ProductDetail />,
        },
    ]
  }
])

/*COMPONENTE*/
export default function AppRouter() 
{
  return (
    <RouterProvider router={router}/>
  );
}