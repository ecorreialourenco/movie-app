import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CredentialsStore {
  session: string;
}

const initialState: CredentialsStore = {
  session: "",
};

export const credentialsStore = createSlice({
  name: "credentialsStore",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<string>) => {
      state.session = action.payload;
    },
  },
});

export const { setSession } = credentialsStore.actions;

export default credentialsStore.reducer;
