import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  CheckCircle,
  Users,
  BarChart2,
  Award,
  Calendar,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[var(--primarybg)] to-[var(--primarybg)]/90 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Empower Your Learning Journey
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Join our educational platform to access high-quality courses,
              interactive learning materials, and a supportive community of
              students and teachers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-white text-[var(--primarybg)] hover:bg-white/90"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Students learning"
              className="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-[var(--cardbg)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--font-dark)] mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-[var(--font-light2)] max-w-3xl mx-auto">
              Discover the features that make our educational platform the
              perfect place for students and teachers alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                  <BookOpen className="h-6 w-6 text-[var(--primarybg)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                  Extensive Course Library
                </h3>
                <p className="text-[var(--font-light2)]">
                  Access a wide range of courses across various subjects, all
                  designed by expert educators.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                  <CheckCircle className="h-6 w-6 text-[var(--primarybg)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                  Interactive Learning
                </h3>
                <p className="text-[var(--font-light2)]">
                  Engage with interactive content, quizzes, and assignments that
                  make learning enjoyable and effective.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                  <Users className="h-6 w-6 text-[var(--primarybg)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                  Supportive Community
                </h3>
                <p className="text-[var(--font-light2)]">
                  Connect with fellow students and teachers to share knowledge
                  and collaborate on projects.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                  <BarChart2 className="h-6 w-6 text-[var(--primarybg)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                  Progress Tracking
                </h3>
                <p className="text-[var(--font-light2)]">
                  Monitor your learning journey with detailed progress reports
                  and performance analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                  <Award className="h-6 w-6 text-[var(--primarybg)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                  Certificates & Achievements
                </h3>
                <p className="text-[var(--font-light2)]">
                  Earn certificates upon course completion to showcase your
                  skills and achievements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                  <Calendar className="h-6 w-6 text-[var(--primarybg)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                  Flexible Learning Schedule
                </h3>
                <p className="text-[var(--font-light2)]">
                  Learn at your own pace with 24/7 access to course materials
                  from any device.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--font-dark)] mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-[var(--font-light2)] max-w-3xl mx-auto">
              Read testimonials from students and teachers who have experienced
              the benefits of our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Student"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--font-dark)]">
                      Sarah Johnson
                    </h4>
                    <p className="text-sm text-[var(--font-light2)]">
                      Computer Science Student
                    </p>
                  </div>
                </div>
                <p className="text-[var(--font-light2)]">
                  "This platform has transformed my learning experience. The
                  interactive courses and supportive community have helped me
                  master programming concepts I previously struggled with."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img
                      src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Teacher"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--font-dark)]">
                      David Chen
                    </h4>
                    <p className="text-sm text-[var(--font-light2)]">
                      Mathematics Professor
                    </p>
                  </div>
                </div>
                <p className="text-[var(--font-light2)]">
                  "As an educator, I appreciate the robust tools this platform
                  provides for creating engaging course content and monitoring
                  student progress. It has revolutionized my teaching approach."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img
                      src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Student"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--font-dark)]">
                      Michael Rodriguez
                    </h4>
                    <p className="text-sm text-[var(--font-light2)]">
                      Business Student
                    </p>
                  </div>
                </div>
                <p className="text-[var(--font-light2)]">
                  "The flexibility of learning at my own pace has been
                  invaluable. I can balance my work commitments while pursuing
                  my business degree, and the quality of education is
                  outstanding."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[var(--primarybg)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg lg:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of students and teachers on our platform today.
            Sign up now to explore courses and enhance your knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-[var(--primarybg)] hover:bg-white/90"
              >
                Sign Up Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}