type RequiresFnType = (
  condition: boolean,
  elseThrow: {
    elseThrow: Error;
  }
) => asserts condition;

export const requires: RequiresFnType = (condition, { elseThrow }) => {
  if (!condition) {
    throw elseThrow;
  }
};
