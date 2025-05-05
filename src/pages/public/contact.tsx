import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  Send,
  CheckCircle,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would send the data to a server
    console.log(data);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[var(--primarybg)] to-[var(--primarybg)]/90 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg max-w-3xl mx-auto opacity-90">
            Have questions or feedback? We'd love to hear from you. Use the form
            below to get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[var(--font-dark)] mb-6">
                Get In Touch
              </h2>
              <p className="text-[var(--font-light2)] mb-8">
                Our support team is here to help you with any questions you may
                have about our platform, courses, or services. We aim to respond
                to all inquiries within 24-48 hours.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 rounded-full w-10 h-10 flex items-center justify-center bg-[var(--primarybg)]/10">
                      <MailIcon className="h-5 w-5 text-[var(--primarybg)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--font-dark)] mb-1">
                        Email Us
                      </h3>
                      <p className="text-[var(--font-light2)]">
                        <a href="mailto:support@eduplatform.com" className="hover:text-[var(--primarybg)]">
                          support@eduplatform.com
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 rounded-full w-10 h-10 flex items-center justify-center bg-[var(--primarybg)]/10">
                      <PhoneIcon className="h-5 w-5 text-[var(--primarybg)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--font-dark)] mb-1">
                        Call Us
                      </h3>
                      <p className="text-[var(--font-light2)]">
                        <a href="tel:+1234567890" className="hover:text-[var(--primarybg)]">
                          +1 (234) 567-890
                        </a>
                      </p>
                      <p className="text-sm text-[var(--font-light2)]">
                        Monday-Friday, 9am-5pm EST
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 rounded-full w-10 h-10 flex items-center justify-center bg-[var(--primarybg)]/10">
                      <MapPinIcon className="h-5 w-5 text-[var(--primarybg)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--font-dark)] mb-1">
                        Visit Us
                      </h3>
                      <p className="text-[var(--font-light2)]">
                        123 Education Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold text-[var(--font-dark)] mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-[var(--font-light2)] mb-6">
                        Thank you for reaching out. We'll get back to you shortly.
                      </p>
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        className="bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-[var(--font-dark)] mb-6">
                        Send a Message
                      </h3>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
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
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input placeholder="Message subject" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Your message" 
                                    className="min-h-[120px]" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button 
                            type="submit" 
                            className="w-full bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90 flex items-center gap-2"
                          >
                            <Send className="h-4 w-4" /> Send Message
                          </Button>
                        </form>
                      </Form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-[var(--cardbg)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--font-dark)] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[var(--font-light2)] max-w-3xl mx-auto">
              Find quick answers to common questions about our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--font-dark)] mb-2">
                  How do I enroll in a course?
                </h3>
                <p className="text-[var(--font-light2)]">
                  To enroll in a course, you need to create an account, browse our course catalog, select the
                  course you're interested in, and click the "Enroll" button.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--font-dark)] mb-2">
                  Are the courses self-paced?
                </h3>
                <p className="text-[var(--font-light2)]">
                  Yes, most of our courses are self-paced, allowing you to learn at your own convenience.
                  Some specialized courses may have scheduled components like live workshops.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--font-dark)] mb-2">
                  How do I become an instructor?
                </h3>
                <p className="text-[var(--font-light2)]">
                  To become an instructor, you need to apply through our Teacher Application process.
                  We review credentials, expertise, and teaching experience before approval.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--font-dark)] mb-2">
                  Are certificates provided upon completion?
                </h3>
                <p className="text-[var(--font-light2)]">
                  Yes, after successfully completing a course, you will receive a digital certificate
                  that you can share on your professional profiles or with employers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}