export const globals = {
  "ts-jest": {
    tsconfig: "./tsconfig.json",
  },
};
export const moduleFileExtensions = ["ts", "js"];
export const transform = {
  "^.+\\.(ts)$": "ts-jest",
};
export const testEnvironment = "node";
