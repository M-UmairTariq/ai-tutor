import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '@/config/ApiConfig';
import { DashboardData, DashboardState } from '@/types/dashboard';



const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null
};

// =======================
// Async Thunk
// =======================

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/dashboard/${userId}`);
      return response.data as DashboardData;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch dashboard data');
      }
      return rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  }
);

// =======================
// Slice
// =======================

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.data = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});


export const { clearDashboard, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
