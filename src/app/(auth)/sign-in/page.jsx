'use client'

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
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data) => {
    // console.log(data)
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }
    if (result?.url) {
      // console.log(redirect)
      router.replace('/');
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat "  style={{backgroundImage: "url('https://i.ibb.co/K7sjkPN/Login-page-Food-Website-Community.jpg')"}}>
      {/* <img className='bg-cover' src='' alt='background img'/> */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md absolute opacity-85">
        <div className="text-center items-center grid justify-self-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back
          </h1>
          <img src="https://i.ibb.co/ZhJtt9q/logo2.jpg" className='h-28 m-1 justify-self-center' alt="Foddi img" />
          <p className="mb-4 mt-1">Sign in to continue your Order</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button className='w-full' type="submit">Sign In</Button>
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
  )
}