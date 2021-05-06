import { createSlice } from "@reduxjs/toolkit";

/**
 * SLICE FUNCTION
 */

const initialProfile = [
  {
    achievements: [
      {
        achievementTitle: "",
        awarder: "",
        date: "",
        event: "",
      },
    ],
    education: [
      {
        discipline: "",
        honors: "",
        nameOfInstitution: "",
        yearEnded: "",
      },
    ],
    firstName: "",
    lastName: "",
    occupation: "",
    location: "",
    website: "",
    email: "",
    telephone: "",
    skills: [
      {
        skill: "",
        tools: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        date: "",
        description: "",
        location: "",
        role: "",
      },
    ],
  },
];

const slice = createSlice({
  name: "profile",
  initialState: {
    profile: initialProfile,
  },
  reducers: {
    onProfileUpdate: (state, action) => {
      state.profile = action.payload;
    },
  },
});
export default slice.reducer;

/*
 ACTIONS FUNCTION
 */

const { onProfileUpdate } = slice.actions;

export const profileUpdate = ({ payload }: any) => async (
  dispatch: (arg0: { payload: any }) => void
) => {
  try {
    dispatch(onProfileUpdate(payload));
  } catch (error) {
    console.log(error);
  }
};
