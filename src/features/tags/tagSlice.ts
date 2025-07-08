import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagState {
  tags: Tag[];
}

const initialState: TagState = {
  tags: [
    { id: 'service', name: 'Service', color: '#60a5fa' },
    { id: 'product', name: 'Product', color: '#f59e42' },
    { id: 'support', name: 'Support', color: '#f87171' },
  ],
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag(state, action: PayloadAction<Tag>) {
      state.tags.push(action.payload);
    },
    updateTag(state, action: PayloadAction<Tag>) {
      const idx = state.tags.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.tags[idx] = action.payload;
    },
    deleteTag(state, action: PayloadAction<string>) {
      state.tags = state.tags.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTag, updateTag, deleteTag } = tagSlice.actions;
export default tagSlice.reducer; 