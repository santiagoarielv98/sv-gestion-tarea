import { demoUserCredentials } from "@/common/constants/app";
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
import { Login, loginSchema } from "../schema/auth-schema";

export function LoginPage() {
  const { mutate } = useLogin();
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: demoUserCredentials,
  });

  const onSubmit = async (data: Login) => {
    await mutate(data);
  };

  return (
    <Card className="mx-auto max-w-sm my-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
                disabled={form.formState.isSubmitting}
              >
                Login
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="#" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
