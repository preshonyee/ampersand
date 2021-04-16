interface UserInterface {
  profilePicture: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: UserInterface;
  }
  interface Response {
    user?: UserInterface;
  }
}
