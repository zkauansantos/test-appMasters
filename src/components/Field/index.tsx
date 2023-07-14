import { Input } from "@/styles/shared/Input";
import { FieldContainer, InputError } from "./styles";
import { UseFormRegister } from "react-hook-form";
interface FieldProps {
  name: string;
  errors: any;
  register: UseFormRegister<any>;
  placeholder: string;
  type: string;
  children?: React.ReactNode;
}

export default function Field({
  errors,
  name,
  register,
  placeholder,
  type,
  children,
}: FieldProps) {
  return (
    <FieldContainer error={!!errors?.[name]}>
      <Input
        error={!!errors?.[name]}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {children}
      {!!errors[name] && <InputError>{errors[name].message}</InputError>}
    </FieldContainer>
  );
}
