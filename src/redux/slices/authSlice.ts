import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Helper functions
const loadUserFromStorage = (): { user: User | null; token: string | null } => {
  try {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return {
      user: userStr ? JSON.parse(userStr) : null,
      token,
    };
  } catch (error) {
    console.error('Failed to load user from storage:', error);
    return { user: null, token: null };
  }
};

// Initial state
const { user, token } = loadUserFromStorage();

const initialState: AuthState = {
  user,
  token,
  isAuthenticated: !!user && !!token,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes - in a real app this would come from a backend
      // Hardcoded users for demo
      const users = [
        {
          id: '1',
          name: 'John Student',
          email: 'student@example.com',
          password: 'password123',
          role: 'student' as UserRole,
        },
        {
          id: '2',
          name: 'Jane Teacher',
          email: 'teacher@example.com',
          password: 'password123',
          role: 'teacher' as UserRole,
        },
      ];

      const user = users.find((u) => u.email === credentials.email);

      if (!user || user.password !== credentials.password) {
        return rejectWithValue('Invalid email or password');
      }

      const { password, ...userWithoutPassword } = user;
      const token = `demo-token-${Math.random().toString(36).substring(2, 15)}`;

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', token);

      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    userData: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
    },
    { rejectWithValue }
  ) => {
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo - in a real app this would be stored in a database
      const newUser = {
        id: Math.random().toString(36).substring(2, 15),
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };

      const token = `demo-token-${Math.random().toString(36).substring(2, 15)}`;

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);

      return {
        user: newUser,
        token,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return null;
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;