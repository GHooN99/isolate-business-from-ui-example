type Asserts = (condition: boolean, message: string) => asserts condition;
export const asserts: Asserts = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};
