import { useNavigate } from 'react-router-dom';
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
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login } from '@/redux/slices/authSlice';
import { useEffect } from 'react';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  useEffect(() => {
    console.log('Auth status:', isAuthenticated, user);
    if (isAuthenticated && user) {
      navigateUser(user);
    }
  }, [isAuthenticated, user, navigate]);

  const navigateUser = (user: any) => {
    if (!user.role || user.role === 'student') {
      navigate('/student/learning-modes');
    } else if (user.role === 'teacher') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const resultAction = await dispatch(
        login({
          username: data.username
        })
      );

      if (login.fulfilled.match(resultAction)) {
        toast.success('Login successful');
        navigateUser(resultAction.payload.user);
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] justify-center">
      <div className="flex items-center bg-white max-w-xl mx-auto rounded-2xl mb-[-5rem] shadow-sm">
        <div className="mx-auto max-w-md w-full p-8 md:px-[64px] md:py-[44px]">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-sans font-medium text-[var(--font-dark)]">
              Welcome back
            </h1>
            <p className="mt-2 text-[var(--font-light2)]">
              Please enter your credentials to continue.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--font-dark)] font-semibold">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        className="h-14 rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90 rounded-full h-14 text-white font-semibold flex items-center justify-center mt-2"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Log In'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}