'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SingInSchema } from '@/Schemas/SignInSchema';
import { useToast } from '@/components/ui/use-toast';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SingInSchema),
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.username || data.email,
      password: data.password,
    });

    if (result?.error) {
      toast({
        title: 'Login Failed',
        description: result.error === 'CredentialsSignin' ? 'Incorrect username or password' : result.error,
        variant: 'destructive',
      });
    }
    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/K7sjkPN/Login-page-Food-Website-Community.jpg')",
      }}
    >
      <div className="w-full max-w-md p-9 space-y-8 bg-white rounded-lg shadow-md opacity-95">
        <div className="text-center items-center grid justify-self-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sing Up to 
          </h1>
          <img
            src="https://i.ibb.co/ZhJtt9q/logo2.jpg"
            className="h-28 m-1 justify-self-center"
            alt="Foddi img"
          />
          <p className="mb-4 mt-1">Register to Satisfy Your Cravings</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Username and Email row */}
            <div className="">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* First Name and Last Name row */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Password and Confirm Password row */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
