/*IMPORTS*/
import * as yup from "yup";
//========================================================

export default productSchema = yup.object({
  title: yup
    .string()
    .min(3, "Informe pelo menos 3 caracteres")
    .max(50, "Nome precisa ter menos de 50 caracteres")
    .required("Campo obrigatório"),

  description: yup
    .string()
    .min(10, "Informe pelo menos 10 caracteres")
    .required("Campo obrigatório"),

  category: yup
    .string()
    .required("Campo obrigatório"),

  price: yup
    .number()
    .typeError("Valor inválido")
    .positive("Valor precisa ser maior do que zero")
    .min(0.01)
    .required("Campo obrigatório"),

  thumbnail: yup
    .string()
    .url("A URL inserida é inválida")
    .required("Campo obrigatório"),
});

