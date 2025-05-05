import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress?: number; // For students
  enrolled?: boolean; // For students
  students?: number; // For teachers
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  completed?: boolean; // For students
}

interface CoursesState {
  courses: Course[];
  assignments: Assignment[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CoursesState = {
  courses: [
    {
      id: '1',
      title: 'Introduction to Programming',
      description:
        'Learn the basics of programming with JavaScript, HTML, and CSS.',
      instructor: 'Jane Teacher',
      thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
      progress: 45,
      enrolled: true,
      students: 32,
    },
    {
      id: '2',
      title: 'Advanced Data Structures',
      description:
        'Explore complex data structures and their applications in software development.',
      instructor: 'Jane Teacher',
      thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
      progress: 70,
      enrolled: true,
      students: 24,
    },
    {
      id: '3',
      title: 'Web Development Masterclass',
      description:
        'Comprehensive guide to building modern, responsive websites.',
      instructor: 'Jane Teacher',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
      progress: 10,
      enrolled: true,
      students: 45,
    },
    {
      id: '4',
      title: 'Machine Learning Fundamentals',
      description:
        'Introduction to machine learning concepts and practical applications.',
      instructor: 'Jane Teacher',
      thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
      progress: 0,
      enrolled: false,
      students: 38,
    },
  ],
  assignments: [
    {
      id: '1',
      courseId: '1',
      title: 'JavaScript Basics Quiz',
      dueDate: '2025-06-15T23:59:59Z',
      completed: false,
    },
    {
      id: '2',
      courseId: '1',
      title: 'HTML/CSS Portfolio Project',
      dueDate: '2025-06-20T23:59:59Z',
      completed: false,
    },
    {
      id: '3',
      courseId: '2',
      title: 'Implement a Binary Search Tree',
      dueDate: '2025-06-12T23:59:59Z',
      completed: true,
    },
    {
      id: '4',
      courseId: '3',
      title: 'Responsive Website Design',
      dueDate: '2025-06-25T23:59:59Z',
      completed: false,
    },
  ],
  loading: false,
  error: null,
};

// Thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return initialState.courses; // In a real app, this would come from an API
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch courses');
    }
  }
);

export const fetchAssignments = createAsyncThunk(
  'courses/fetchAssignments',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return initialState.assignments; // In a real app, this would come from an API
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch assignments');
    }
  }
);

// Slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.courses = action.payload;
        }
      )
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Assignments
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAssignments.fulfilled,
        (state, action: PayloadAction<Assignment[]>) => {
          state.loading = false;
          state.assignments = action.payload;
        }
      )
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default coursesSlice.reducer;