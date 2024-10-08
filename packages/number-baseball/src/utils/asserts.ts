type Asserts = (
  condition: boolean,
  elseThrow: {
    ifFail: Error;
  }
) => asserts condition;

export const asserts: Asserts = (condition, { ifFail }) => {
  if (!condition) {
    throw ifFail;
  }
};
