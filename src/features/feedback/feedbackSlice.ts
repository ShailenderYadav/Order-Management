import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FeedbackItem = {
  id: string;
  customer: string;
  message: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
  date: string;
};

interface FeedbackState {
  items: FeedbackItem[];
  search: string;
  filterTag: string | null;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

const initialState: FeedbackState = {
  items: [
    { id: '1', customer: 'Alice', message: 'Great service!', sentiment: 'positive', tags: ['service'], date: '2024-07-01' },
    { id: '2', customer: 'Bob', message: 'Could be better.', sentiment: 'neutral', tags: ['product'], date: '2024-07-02' },
    { id: '3', customer: 'Charlie', message: 'Very disappointed.', sentiment: 'negative', tags: ['support'], date: '2024-07-03' },
    // Add more mock items as needed
  ],
  search: '',
  filterTag: null,
  page: 1,
  pageSize: 10,
  hasMore: true,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setFilterTag(state, action: PayloadAction<string | null>) {
      state.filterTag = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    addFeedback(state, action: PayloadAction<FeedbackItem>) {
      state.items.unshift(action.payload);
    },
    updateFeedback(state, action: PayloadAction<FeedbackItem>) {
      const idx = state.items.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
  },
});

export const { setSearch, setFilterTag, setPage, addFeedback, updateFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer; 