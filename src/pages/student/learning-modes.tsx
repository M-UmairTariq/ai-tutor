import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LearningModes() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode === 'chat') {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Chat Mode</h1>
        {/* Chat interface implementation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p>Chat interface coming soon...</p>
        </div>
      </div>
    );
  }

  if (mode === 'photo') {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Photo Mode</h1>
        {/* Photo analysis interface implementation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p>Photo analysis interface coming soon...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Learning Modes</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Link to="/student/learning-modes?mode=chat">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Chat Mode</h2>
                  <p className="text-[var(--font-light2)]">
                    Enhance your language skills by chatting with our AI teacher.
                  </p>
                </div>
                <img
                  src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="AI Chat"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <Button className="w-full bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90">
                Start
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/student/learning-modes?mode=photo">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Photo Mode</h2>
                  <p className="text-[var(--font-light2)]">
                    Let's break down images and get instant feedback from AI.
                  </p>
                </div>
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Photo Analysis"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <Button className="w-full bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90">
                Start
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}