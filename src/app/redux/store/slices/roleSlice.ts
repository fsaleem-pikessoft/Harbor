import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleState {
  roles: string[];
}

const initialState: RoleState = {
  roles: [],
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<string[]>) => {
      state.roles = action.payload;
    },
  },
});

export const { setRoles } = roleSlice.actions;
export default roleSlice.reducer;
