import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { BookOpen, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login } from '@/redux/slices/authSlice';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // const resultAction = await dispatch(
      //   login({
      //     email: data.email,
      //     password: data.password,
      //   })
      // );

      // if (login.fulfilled.match(resultAction)) {
        toast.success('Login successful');
        // const user = resultAction.payload.user;
        
        // Redirect based on user role
        // if (user.role === 'student') {
          navigate('/student/learning-modes');
        // } else if (user.role === 'teacher') {
          // navigate('/teacher/dashboard');
        // } else {
          // navigate('/');
        // }
      // }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="mx-auto max-w-md w-full p-6">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-3">
              <BookOpen className="h-10 w-10 text-[var(--primarybg)]" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--font-dark)]">
              Welcome back
            </h1>
            <p className="mt-2 text-[var(--font-light2)]">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-[var(--primarybg)] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="Your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm cursor-pointer">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--font-light2)]">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[var(--primarybg)] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center text-xs text-[var(--font-light2)]">
            <p className="mb-1">For demo purposes, use these credentials:</p>
            <p>Student: student@example.com / password123</p>
            <p>Teacher: teacher@example.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}