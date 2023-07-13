import { AuthContext } from "@/contexts/AuthContext";
import getAuthValidationSchema from "@/utils/getAuthValidationFieldsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";

export default function useAuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const { signUp, signIn, clearAuthError, authError } = useContext(AuthContext);
  const validateFieldsSchema = getAuthValidationSchema(isSignIn);

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<yup.InferType<typeof validateFieldsSchema>>({
    resolver: yupResolver(validateFieldsSchema),
  });

  useEffect(() => {
    reset();
    clearErrors();
    clearAuthError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn, reset, clearErrors]);

  useEffect(() => {
    if (authError?.showInEmail) {
      setError("email", { message: authError.message });
    }

    if (authError?.showInPassword) {
      setError("password", { message: authError.message });
    }
  }, [authError, setError]);

  const handleSignIn: SubmitHandler<
    yup.InferType<typeof validateFieldsSchema>
  > = async (formData, event) => {
    event?.preventDefault();

    const { name, email, password } = formData;

    if (isSignIn) {
      return signIn(email, password);
    }

    signUp(name, email, password);
    return true;
  };

  return {
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
  };
}
