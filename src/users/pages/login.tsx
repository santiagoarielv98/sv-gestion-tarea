import { demoUserCredentials } from "@/constants/app";
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
import LoginForm from "../components/login-form";
import { useLogin } from "../hooks/use-user";
import type { Login } from "../schema/auth-schema";
import { loginSchema } from "../schema/auth-schema";

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: demoUserCredentials,
  });

  const onSubmit = async (data: Login) => {
    await login(data);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto my-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y contraseña para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <LoginForm form={form} />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting || isPending}
                >
                  {form.formState.isSubmitting || isPending
                    ? "Iniciando sesión"
                    : "Iniciar sesión"}
                </Button>
                <div className="mt-4 text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register" className="underline">
                    Regístrate
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
