import * as yup from "yup";

export default function getAuthValidationSchema(isSignIn: boolean) {
  return yup.object().shape({
    name: yup
      .string()
      .required("Nome é obrigatório")
      .when("isSignIn", {
        is: () => isSignIn === true,
        then: (schema) => schema.optional(),
      }),
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "A senha precisa de no mínimo 6 caracteres"),
    passwordConfirmation: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "A senha precisa de no mínimo 6 caracteres")
      .oneOf(["", yup.ref("password")], "As senhas precisam ser iguais")
      .when("isSignIn", {
        is: () => isSignIn === true,
        then: (schema) => schema.optional(),
      }),
  });
}
