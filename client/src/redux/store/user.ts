import { createSlice } from "@reduxjs/toolkit";

type UserType = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
};

export interface ILoginSuccess {
  payload: {
    token: string;
    user: UserType;
  };
}

/**
 * SLICE FUNCTION
 */

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("jwt", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("appMode", "app");
    },
    logoutSuccess: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
});
export default slice.reducer;

/**
 * ACTIONS FUNCTION
 */
const { loginSuccess, logoutSuccess } = slice.actions;
// Login action
export const login = ({ payload }: ILoginSuccess) => async (
  dispatch: (arg0: { payload: ILoginSuccess }) => void
) => {
  try {
    dispatch(loginSuccess(payload));
  } catch (error) {
    console.log(error);
  }
};
// Logout action
export const logout = ({ history }: any) => async (
  dispatch: (arg0: { payload: any }) => any
) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    dispatch(logoutSuccess());
    history.push("/login");
  } catch (error) {
    console.log(error);
  }
};
