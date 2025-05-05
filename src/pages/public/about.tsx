import { BookOpen, GraduationCap, Users, Globe, Award, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[var(--primarybg)] to-[var(--primarybg)]/90 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About EduPlatform</h1>
          <p className="text-lg max-w-3xl mx-auto opacity-90">
            Our mission is to provide accessible, high-quality education to learners worldwide through an
            innovative online platform that connects students with expert educators.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--font-dark)] mb-6">Our Story</h2>
              <p className="text-[var(--font-light2)] mb-4">
                EduPlatform was founded in 2023 with a vision to transform education by making it more
                accessible, engaging, and effective through technology.
              </p>
              <p className="text-[var(--font-light2)] mb-4">
                What started as a small project has grown into a comprehensive educational platform
                serving thousands of students and teachers across the globe.
              </p>
              <p className="text-[var(--font-light2)]">
                Our team of educators, developers, and learning specialists work together to create
                an educational experience that adapts to the needs of modern learners while maintaining
                the highest standards of academic excellence.
              </p>
            </div>
            <div className="order-first md:order-last">
              <img
                src="https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Team collaboration"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 lg:py-20 bg-[var(--cardbg)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--font-dark)] mb-4">Our Values</h2>
            <p className="text-lg text-[var(--font-light2)] max-w-3xl mx-auto">
              These core principles guide everything we do at EduPlatform, from course development
              to platform features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                <BookOpen className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                Excellence in Education
              </h3>
              <p className="text-[var(--font-light2)]">
                We are committed to providing the highest quality educational content, designed and
                reviewed by experts in their respective fields.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                <GraduationCap className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                Student-Centered Learning
              </h3>
              <p className="text-[var(--font-light2)]">
                We design our platform and courses with students at the center, focusing on their needs,
                learning styles, and educational goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                <Users className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                Community & Collaboration
              </h3>
              <p className="text-[var(--font-light2)]">
                We believe learning is enhanced through community engagement and collaborative
                opportunities among students and teachers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                <Globe className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                Accessibility & Inclusion
              </h3>
              <p className="text-[var(--font-light2)]">
                We strive to make education accessible to all, regardless of geographical location,
                background, or learning challenges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                <Award className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                Innovation & Adaptation
              </h3>
              <p className="text-[var(--font-light2)]">
                We continuously explore new technologies and pedagogical approaches to enhance the
                learning experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10 mb-4">
                <Star className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--font-dark)] mb-2">
                Integrity & Transparency
              </h3>
              <p className="text-[var(--font-light2)]">
                We operate with honesty and transparency in all aspects of our business, from content
                creation to user data management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--font-dark)] mb-4">Our Leadership Team</h2>
            <p className="text-lg text-[var(--font-light2)] max-w-3xl mx-auto">
              Meet the dedicated professionals who guide our organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-[var(--font-dark)]">Michael Anderson</h3>
              <p className="text-[var(--font-light2)] mb-3">CEO & Founder</p>
              <p className="text-[var(--font-light2)] max-w-sm mx-auto">
                Former education professor with 15+ years of experience in EdTech innovation.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-[var(--font-dark)]">Sophia Martinez</h3>
              <p className="text-[var(--font-light2)] mb-3">Chief Technology Officer</p>
              <p className="text-[var(--font-light2)] max-w-sm mx-auto">
                Tech innovator with expertise in creating accessible digital learning environments.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="CPO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-[var(--font-dark)]">James Wilson</h3>
              <p className="text-[var(--font-light2)] mb-3">Chief Product Officer</p>
              <p className="text-[var(--font-light2)] max-w-sm mx-auto">
                Educational psychologist focusing on creating engaging learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}