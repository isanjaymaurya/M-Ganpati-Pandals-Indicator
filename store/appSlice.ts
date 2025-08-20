import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VisitedPandal {
  name: string;
  lat: number;
  lng: number;
}

export interface AppState {
  visited: VisitedPandal[];
}

const initialState: AppState = {
  visited: typeof window !== 'undefined' && localStorage.getItem('visitedPandals')
    ? JSON.parse(localStorage.getItem('visitedPandals')!)
    : [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    markVisited: (state, action: PayloadAction<VisitedPandal>) => {
      if (!state.visited.some(p => p.name === action.payload.name)) {
        state.visited.push(action.payload);
        localStorage.setItem('visitedPandals', JSON.stringify(state.visited));
      }
    },
    unmarkVisited: (state, action: PayloadAction<string>) => {
      state.visited = state.visited.filter(p => p.name !== action.payload);
      localStorage.setItem('visitedPandals', JSON.stringify(state.visited));
    },
    setVisited: (state, action: PayloadAction<VisitedPandal[]>) => {
      state.visited = action.payload;
      localStorage.setItem('visitedPandals', JSON.stringify(state.visited));
    },
  },
});

export const { markVisited, unmarkVisited, setVisited } = appSlice.actions;
export default appSlice.reducer;

