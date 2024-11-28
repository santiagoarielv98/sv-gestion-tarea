import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import RegisterForm from "../components/register-form";
import { useRegister } from "../hooks/use-user";
import type { Register } from "../schema/auth-schema";
import { registerSchema } from "../schema/auth-schema";

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();
  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: Register) => {
    register(data);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto my-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Registrarse</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y contraseña para registrarte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <RegisterForm form={form} />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting || isPending}
                >
                  {form.formState.isSubmitting || isPending
                    ? "Registrando"
                    : "Registrarse"}
                </Button>
                <div className="mt-4 text-center text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="underline">
                    Inicia sesión
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
