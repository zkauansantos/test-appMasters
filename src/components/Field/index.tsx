import { FieldContainer, InputError } from "./styles";

interface FieldProps {
  name: string;
  errors: any;
  children: React.ReactNode;
}

export default function Field({ errors, name, children }: FieldProps) {
  return (
    <FieldContainer error={!!errors?.[name]}>
      {children}
      {!!errors[name] && <InputError>{errors[name].message}</InputError>}
    </FieldContainer>
  );
}
