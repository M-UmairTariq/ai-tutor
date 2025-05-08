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
// import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
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
  name: z.string().min(1, {
    message: 'Name is required',
  })
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

      console.log('Login result:', data);

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
    <div className="flex flex-col min-h-[calc(100vh-64px)] justify-center" >
      <div className="flex items-center bg-white max-w-xl mx-auto rounded-2xl mb-[-5rem] shadow-sm">
        <div className="mx-auto max-w-md w-full p-8 md:px-[64px] md:py-[44px]">
          <div className="mb-8">
            <h1 className=" text-3xl md:text-4xl font-sans font-medium text-[var(--font-dark)]">
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--font-dark)] font-semibold">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 rounded-sm"  // increase height here
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* <FormField
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
              /> */}

              {/* <FormField
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
              /> */}

              <Button
                type="submit"
                className="w-full bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90 rounded-full h-14 text-white font-semibold flex items-center justify-center mt-2"
                disabled={loading}
              // onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>
          </Form>

          {/* <div className="mt-6 text-center">
            <p className="text-sm text-[var(--font-light2)]">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[var(--primarybg)] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div> */}

          {/* <div className="mt-6 text-center text-xs text-[var(--font-light2)]">
            <p className="mb-1">For demo purposes, use these credentials:</p>
            <p>Student: student@example.com / password123</p>
            <p>Teacher: teacher@example.com / password123</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}