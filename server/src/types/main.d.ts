// someDefinitionFile.d.ts

// Target the module containing the `ProcessEnv` interface
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare global {
  namespace NodeJS {
    // Merge the existing `ProcessEnv` definition with ours
    // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      JWT_SECRET: string;
      MONGO_URI: string;
      MY_API_KEY: string;
      DB_USER?: string;
      // ...
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
