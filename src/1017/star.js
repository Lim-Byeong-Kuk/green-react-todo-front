export const f = () => {
  const plus = (a, b) => {
    return a + b;
  };
  const minus = (a, b) => {
    return a - b;
  };
  const mul = (a, b) => {
    return a * b;
  };

  return { plus, minus, mul };
};
