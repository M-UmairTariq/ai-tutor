import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen,
  CheckCircle,
  Play,
  FileText,
  MessageSquare,
  Save,
  PenTool,
} from 'lucide-react';

export default function StudentLearningMode() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course') || '1'; // Default to the first course if none specified
  
  const { courses } = useAppSelector((state) => state.courses);
  const course = courses.find((c) => c.id === courseId) || courses[0];
  
  const [activeTab, setActiveTab] = useState('content');
  const [notes, setNotes] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  // Mock video sections for the demonstration
  const videoSections = [
    { id: '1', title: 'Introduction', length: '5:24', watched: true },
    { id: '2', title: 'Core Concepts', length: '12:38', watched: true },
    { id: '3', title: 'Advanced Techniques', length: '18:05', watched: false },
    { id: '4', title: 'Practical Applications', length: '15:47', watched: false },
    { id: '5', title: 'Final Project Overview', length: '8:32', watched: false },
  ];

  // Mock lesson content
  const lessonContent = `
    <h3>Learning Objectives</h3>
    <ul>
      <li>Understand the key principles of the subject</li>
      <li>Apply theoretical concepts to practical scenarios</li>
      <li>Develop problem-solving skills through exercises</li>
      <li>Create your own implementation based on learned techniques</li>
    </ul>
    
    <h3>Key Concepts</h3>
    <p>This section introduces the fundamental concepts that form the foundation of this course. 
    You'll learn about the core principles, historical context, and modern applications.</p>
    
    <p>Through a combination of theoretical explanations and practical examples, you'll develop a 
    comprehensive understanding of the subject matter that will prepare you for more advanced topics.</p>
    
    <h3>Practice Exercises</h3>
    <p>To reinforce your learning, complete the following exercises:</p>
    <ol>
      <li>Analyze the provided case study and identify the key principles at work</li>
      <li>Design a solution to the problem presented in the scenario</li>
      <li>Implement your solution using the techniques covered in this lesson</li>
      <li>Evaluate your solution against the criteria discussed in the lecture</li>
    </ol>
  `;

  const saveNotes = () => {
    // In a real app, this would save to a database
    setTimeout(() => {
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 3000);
    }, 500);
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Course not found. Please select a valid course.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Course Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--font-dark)]">{course.title}</h1>
        <p className="text-[var(--font-light2)]">Instructor: {course.instructor}</p>
        <div className="mt-3 flex items-center">
          <Progress value={course.progress || 0} className="h-2 w-48 mr-3" />
          <span className="text-sm text-[var(--font-light2)]">
            {course.progress || 0}% Complete
          </span>
        </div>
      </div>

      {/* Main Learning Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Course Navigation */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Course Content</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {videoSections.map((section) => (
                  <button
                    key={section.id}
                    className={`w-full flex items-center p-3 text-left transition-colors hover:bg-muted ${
                      section.id === '3' ? 'bg-muted' : ''
                    }`}
                    onClick={() => {}}
                  >
                    <div className="mr-3">
                      {section.watched ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Play className="h-5 w-5 text-[var(--primarybg)]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs text-[var(--font-light2)]">
                        {section.length}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            {/* Video Player (Simulated) */}
            <div className="relative aspect-video bg-black">
              <img
                src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Course thumbnail"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-black/50 text-white border-white/20 hover:bg-black/70"
                  onClick={() => setVideoPlaying(!videoPlaying)}
                >
                  {videoPlaying ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-sm border-2"></span> Pause
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play className="h-5 w-5" /> Play Video
                    </span>
                  )}
                </Button>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="text-white text-sm font-medium">
                  Advanced Techniques - Part 1
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="text-white text-sm">18:05</div>
              </div>
            </div>

            {/* Tabs for Content, Notes, Discussion */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
              <TabsList className="mb-4">
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Lesson Content
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" /> My Notes
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Resources
                </TabsTrigger>
                <TabsTrigger value="discussion" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <div className="prose max-w-none dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: lessonContent }} />
                </div>
              </TabsContent>

              <TabsContent value="notes">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Take notes here..."
                    className="min-h-[300px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={saveNotes}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" /> 
                      {notesSaved ? 'Saved!' : 'Save Notes'}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Downloadable Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <a 
                        href="#" 
                        className="flex items-center p-3 border rounded-md hover:bg-muted transition-colors"
                      >
                        <FileText className="h-5 w-5 mr-3 text-[var(--primarybg)]" />
                        <div>
                          <div className="font-medium">Lesson Slides</div>
                          <div className="text-xs text-[var(--font-light2)]">PDF - 2.4 MB</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="flex items-center p-3 border rounded-md hover:bg-muted transition-colors"
                      >
                        <FileText className="h-5 w-5 mr-3 text-[var(--primarybg)]" />
                        <div>
                          <div className="font-medium">Example Code</div>
                          <div className="text-xs text-[var(--font-light2)]">ZIP - 1.8 MB</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="flex items-center p-3 border rounded-md hover:bg-muted transition-colors"
                      >
                        <FileText className="h-5 w-5 mr-3 text-[var(--primarybg)]" />
                        <div>
                          <div className="font-medium">Exercise Worksheet</div>
                          <div className="text-xs text-[var(--font-light2)]">PDF - 1.2 MB</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="discussion">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Course Discussion</h3>
                  <p className="text-[var(--font-light2)]">
                    Join the conversation with other students and the instructor.
                  </p>
                  <div className="p-4 bg-muted rounded-md text-center">
                    <p className="text-[var(--font-light2)]">
                      Discussion forum will be available soon.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}