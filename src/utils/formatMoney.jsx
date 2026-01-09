export default function formatMoney(valor) 
{
  return new Intl.NumberFormat("pt-BR", 
  {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
