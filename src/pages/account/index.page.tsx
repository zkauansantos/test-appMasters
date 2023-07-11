import Image from "next/image";
import { AccountContainer, AccountWrapper, FormUserEdit } from "./styles";

import avatar from "@/assets/imgs/avatar.png";
import Field from "@/components/Field";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Account() {
  const updateUserYupSchema = yup.object().shape({
    // name: yup.string().optional(),
    picture: yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({});

  const handleEditUser: SubmitHandler<
    yup.InferType<typeof updateUserYupSchema>
  > = async (fieldValues, event) => {
    event?.preventDefault();
    console.log(fieldValues.picture);
  };

  return (
    <AccountContainer>
      <AccountWrapper>
        <Image src={avatar} width={650} height={400} alt="photo-user" />

        <FormUserEdit onSubmit={handleSubmit(handleEditUser)}>
          <div style={{ width: "100%" }}>
            <strong>Editar cadastro</strong>

            {/* <Field errors={{}} name="name">
              <input type="text" placeholder="Nome" {...register("name")} />
            </Field> */}

            <Field errors={{}} name="name">
              <input type="file" {...register("picture")} />
            </Field>
          </div>

          <Button type="submit">Editar</Button>
        </FormUserEdit>
      </AccountWrapper>
    </AccountContainer>
  );
}
