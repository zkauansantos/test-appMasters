/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";

import { Container, ContainerForm, Field, InputError } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import * as yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const validateFieldsSchema = yup.object().shape({
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
    password: yup.string().required("Senha obrigatória"),
    passwordConfirmation: yup
      .string()
      .required("Senha obrigatória")
      .oneOf(["", yup.ref("password")], "As senhas precisam ser iguais")
      .when("isSignIn", {
        is: () => isSignIn === true,
        then: (schema) => schema.optional(),
      }),
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<yup.InferType<typeof validateFieldsSchema>>({
    resolver: yupResolver(validateFieldsSchema),
  });

  useEffect(() => {
    reset(), clearErrors();
  }, [isSignIn, reset, clearErrors]);

  const handleSignIn: SubmitHandler<
    yup.InferType<typeof validateFieldsSchema>
  > = async (formData, event) => {
    event?.preventDefault();
    return true;
  };

  return (
    <>
      <Head>
        {isSignIn && <title>Login</title>}
        {!isSignIn && <title>Registro</title>}
      </Head>

      <Container>
        <ContainerForm onSubmit={handleSubmit(handleSignIn)}>
          <h1>
            {isSignIn && "Entrar"}
            {!isSignIn && "Cadastro"}
          </h1>

          {!isSignIn && (
            <Field error={!!errors.name}>
              <input type="text" placeholder="Nome" {...register("name")} />
              {!!errors.name && <InputError>{errors.name.message}</InputError>}
            </Field>
          )}

          <Field error={!!errors.email}>
            <input type="email" placeholder="E-mail" {...register("email")} />
            {!!errors.email && <InputError>{errors.email.message}</InputError>}
          </Field>

          <Field error={!!errors.password}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("password")}
            />

            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <BsEye /> : <BsEyeSlash />}
            </button>

            {!!errors.password && (
              <InputError>{errors.password.message}</InputError>
            )}
          </Field>

          {!isSignIn && (
            <Field error={!!errors.passwordConfirmation}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                {...register("passwordConfirmation")}
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword((prev) => !prev)}
              ></button>
              {!!errors.passwordConfirmation && (
                <InputError>{errors.passwordConfirmation.message}</InputError>
              )}
            </Field>
          )}

          <div>
            <button type="submit" disabled={isLoading || isSubmitting}>
              {isSignIn ? "Login" : "Cadastrar"}
            </button>
          </div>

          <div className="suggestions">
            <p>{isSignIn ? "Não tem login?" : "Já tem login?"}</p>
            <button type="button" onClick={() => setIsSignIn((prev) => !prev)}>
              {isSignIn ? "Cadastre-se" : "Entrar"}
            </button>
          </div>
        </ContainerForm>
      </Container>
    </>
  );
}
