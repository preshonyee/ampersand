import { createContext } from "react";

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
};

type UserStateType = {
  token: string;
  user: UserType;
};

type AuthContextType = {
  user: null | UserStateType;
  setUser: (UserStateType: UserStateType | null) => void;
};

const initialUserState = {
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  },
};

const AuthContext = createContext<AuthContextType>({
  user: initialUserState,
  setUser: () => console.log("No user provided"),
});

export default AuthContext;
