// someDefinitionFile.d.ts

// Target the module containing the `ProcessEnv` interface
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    JWT_SECRET: string;
    MY_API_KEY: string;
    DB_USER?: string;
    // ...
  }
}

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
