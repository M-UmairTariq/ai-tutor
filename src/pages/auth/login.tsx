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
import { login, addPhoneNumber, clearError } from '@/redux/slices/authSlice';
import { useEffect, useState } from 'react';
// import { ArrowLeft } from 'lucide-react';

// Username form schema
const usernameFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
});

// Phone number form schema
const phoneFormSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Valid phone number is required' }),
});

type UsernameFormValues = z.infer<typeof usernameFormSchema>;
type PhoneFormValues = z.infer<typeof phoneFormSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);

  // State to track whether we're showing the phone number input
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  // Store username for later use with phone number submission
  const [currentUsername, setCurrentUsername] = useState('');
  // Store whether we're currently submitting the phone number
  const [isSubmittingPhone, setIsSubmittingPhone] = useState(false);

  // Username form
  const usernameForm = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: '',
    },
  });


  // Phone number form
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  useEffect(() => {
    console.log('Auth status:', isAuthenticated, user);
    if (isAuthenticated && user) {
      // Check if user has phone number
      if (user.phoneNumber) {
        navigateUser(user);
      } else {
        // Show phone number input if no phone number exists
        setShowPhoneInput(true);
        // Clear any previous phone number in the form when switching to phone input
        phoneForm.reset({ phoneNumber: '' });
      }
    }
  }, [isAuthenticated, user, phoneForm]);

  const navigateUser = (user: any) => {
    if (!user.role || user.role === 'student') {
      navigate('/student/learning-modes');
    } else if (user.role === 'teacher') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  // Handle back button click
  const handleBackToUsername = () => {
    setShowPhoneInput(false);
    dispatch(clearError()); // Clear any errors when going back
  };

  const onUsernameSubmit = async (data: UsernameFormValues) => {
    try {
      setCurrentUsername(data.username);

      const resultAction = await dispatch(
        login({
          username: data.username
        })
      );

      if (login.fulfilled.match(resultAction)) {
        // If user has phone number, will be redirected by useEffect
        // Otherwise, phone input will be shown
        if (resultAction.payload.user.phoneNumber) {
          toast.success('Login successful');
          navigateUser(resultAction.payload.user);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const onPhoneSubmit = async (data: PhoneFormValues) => {
    try {
      setIsSubmittingPhone(true);
      const resultAction = await dispatch(
        addPhoneNumber({
          username: currentUsername,
          phoneNumber: data.phoneNumber
        })
      );

      if (addPhoneNumber.fulfilled.match(resultAction)) {
        toast.success('Phone number added successfully');
        setTimeout(() => {
          navigateUser(resultAction.payload.user);
        })
      }
    } catch (error) {
      console.error('Adding phone number failed:', error);
      toast.error('Failed to add phone number. Please try again.');
    } finally {
      setIsSubmittingPhone(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] justify-center">
      <div className="flex items-center bg-white max-w-xl mx-auto rounded-2xl mb-[-5rem] shadow-sm">
        <div className="mx-auto max-w-md w-full p-8 md:px-[64px] md:py-[44px]">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-sans font-medium text-[var(--font-dark)]">
              {showPhoneInput ? 'Enter Phone Number' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-[var(--font-light2)]">
              {showPhoneInput
                ? 'Please enter your phone number to continue.'
                : 'Please enter your credentials to continue.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {!showPhoneInput ? (
            // Username Form
            <Form {...usernameForm}>
              <form onSubmit={usernameForm.handleSubmit(onUsernameSubmit)} className="space-y-6">
                <FormField
                  control={usernameForm.control}
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
          ) : (
            // Phone Number Form
            <>

              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                  <FormField
                    control={phoneForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--font-dark)] font-semibold">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            className="h-14 rounded-sm"
                            type="tel"
                            value={field.value}
                            onChange={(e) => {
                              const onlyNums = e.target.value.replace(/\D/g, '');
                              field.onChange(onlyNums);
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                          />

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90 rounded-full h-14 text-white font-semibold flex items-center justify-center mt-2"
                    disabled={isSubmittingPhone}
                  >
                    {isSubmittingPhone ? 'Adding...' : 'Add'}
                  </Button>
                  <Button
                    type="submit"
                    className="w-full bg-white hover:bg-slate-200 rounded-full h-14 text-black font-semibold flex items-center justify-center mt-2"
                    onClick={handleBackToUsername}
                  >
                    Back
                  </Button>

                  {/* <div className="mb-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="flex items-center text-[var(--font-light2)] hover:text-[var(--font-dark)]"
                  onClick={handleBackToUsername}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to username
                </Button>
              </div> */}
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}