/*MÉTODOS*/
//1) GET
//a) All
export const getProducts = async () => 
{
 const response = await fetch("https://dummyjson.com/products");

 if(!response.ok)
 {
  throw new Error(`Erro na requisição: ${response.status}`);
 }

 const data = await response.json();

 return data.products;
}
//----------------------------/--------------------------

//b) By ID
export const getProductById = async(productId) =>
{
 const response = await fetch("https://dummyjson.com/products/" + productId);

 if(!response.ok)
 {
  throw new Error(`Erro na requisição: ${response.status}`);
 }

 const data = await response.json();

 return data;
}
//----------------------------------//--------------------------------

//2) PUT
export const editProduct = async(productId, productData) =>
{
 const response = await fetch("https://dummyjson.com/products/" + productId,
 {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(productData),
 });

 if(!response.ok)
 {
  throw new Error(`Erro na requisição: ${response.status}`);
 }

 const data = await response.json();

 return data;
}
//----------------------------------//--------------------------------

//3) DELETE
export const deleteProduct = async(productId) =>
{
 const response = await fetch("https://dummyjson.com/products/" + productId,
 {
  method: 'DELETE',
 });

 if(!response.ok)
 {
  throw new Error(`Erro na requisição: ${response.status}`);
 }

 const data = await response.json();

 return data;
}
//----------------------------------//--------------------------------

//4) POST
export const createProduct = async(productData) =>
{
 const response = await fetch("https://dummyjson.com/products/add",
 {
  method: `POST`,
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(productData),
 });

 if(!response.ok)
 {
  throw new Error(`Erro na requisição: ${response.status}`);
 }

 const data = await response.json();

 return data;
}