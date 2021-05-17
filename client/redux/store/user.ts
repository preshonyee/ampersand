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
const ISSERVER = typeof window === "undefined";

let initialUser;

if (!ISSERVER) {
  initialUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
}

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
    },
    logoutSuccess: (state) => {
      state.user = null;
      localStorage.clear();
    },
    updateProfilePictureSuccess: (state, action) => {
      console.log({ state, action });
      state.user.profilePicture = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, profilePicture: action.payload })
      );
    },
  },
});
export default slice.reducer;

/**
 * ACTIONS FUNCTION
 */
const { loginSuccess, logoutSuccess, updateProfilePictureSuccess } =
  slice.actions;
// Login action
export const login =
  ({ payload }: ILoginSuccess) =>
  async (dispatch: (arg0: { payload: ILoginSuccess }) => void) => {
    try {
      dispatch(loginSuccess(payload));
    } catch (error) {
      console.log(error);
    }
  };
// Logout action
export const logout =
  ({ router }: any) =>
  async (dispatch: (arg0: { payload: any }) => any) => {
    try {
      // const res = await api.post('/api/auth/logout/')
      router.push("/login");
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

// Update profile picture action
export const updateProfilePicture =
  ({ payload }: any) =>
  async (dispatch: (arg0: { payload: any }) => void) => {
    try {
      dispatch(updateProfilePictureSuccess(payload));
    } catch (error) {
      console.log(error);
    }
  };
