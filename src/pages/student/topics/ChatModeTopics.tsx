import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTopics } from '@/redux/slices/topicsSlice';
// import { logout } from '@/redux/slices/authSlice';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ChatModeTopics = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { topics, isLoading, error } = useAppSelector((state) => state.topics);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTopics({ userId: user.id, topicMode: 'chat-mode' }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  return (
    <div className="container mx-auto px-4 py-6">
      {/* <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Chat Modes</h1>
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleLogout}
          className="rounded-full"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div> */}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="aspect-video w-full">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Skeleton className="h-10 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.length > 0 ? (
            topics.map((topic: any) => (
              <Card key={topic.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video w-full relative overflow-hidden">
                  <img
                    src={topic.attachmentUrl}
                    alt={topic.topicName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <CardContent className="flex gap-6 justify-end items-center flex-grow p-4">
                  <h3 className="font-medium text-base">{topic.topicName}</h3>
                  <Link to={`/student/learning-mode/${topic?.id}/${topic.topicName}?mode=chat-mode`} >

                    <Button
                      size="sm"
                      // onClick={() => navigate(`/student/learning-mode/${topic.id}?mode=chat-mode`)}
                    >
                      Start
                    </Button>

                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No topics available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatModeTopics;