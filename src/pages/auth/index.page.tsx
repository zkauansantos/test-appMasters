/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";

import useAuthPage from "./useAuthPage";

import { BsEye, BsEyeSlash } from "react-icons/bs";

import { InputError } from "@/components/Field/styles";
import Field from "@/components/Field";
import Button from "@/components/Button";

import { Container, ContainerForm } from "./styles";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Auth() {
  const {
    isSignIn,
    errors,
    isLoading,
    isSubmitting,
    authError,
    showPassword,
    setIsSignIn,
    handleSubmit,
    handleSignIn,
    register,
    setShowPassword,
  } = useAuthPage();
  const { "user-id": userId } = parseCookies();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push("/");
    }
  }, [userId, router]);

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
            <Field
              register={register}
              errors={errors}
              name="name"
              placeholder="Nome"
              type="text"
            />
          )}

          <Field
            register={register}
            errors={errors}
            name="email"
            placeholder="E-mail"
            type="email"
          />

          <Field
            register={register}
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            errors={errors}
            name="password"
          >
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <BsEye size={18} /> : <BsEyeSlash size={18} />}
            </button>
          </Field>

          {!isSignIn && (
            <Field
              register={register}
              placeholder="Confirme sua senha"
              type={showPassword ? "text" : "password"}
              errors={errors}
              name="passwordConfirmation"
            />
          )}

          <div className="btn">
            <Button type="submit" disabled={isLoading || isSubmitting}>
              {isSignIn ? "Login" : "Cadastrar"}
            </Button>
          </div>

          <div className="suggestions">
            <div>
              <p>{isSignIn ? "Não tem login?" : "Já tem login?"}</p>
              <button
                className="changer"
                disabled={isLoading || isSubmitting}
                type="button"
                onClick={() => setIsSignIn((prev) => !prev)}
              >
                {isSignIn ? "Cadastre-se" : "Entrar"}
              </button>
            </div>

            {!!authError && !!authError.showInButton && (
              <InputError>{authError.message}</InputError>
            )}
          </div>
        </ContainerForm>
      </Container>
    </>
  );
}
