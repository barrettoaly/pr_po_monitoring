export const validateAndSetAmountNumber = (value, setterFunction) => {
  // Check if the input value is a number
  if (!isNaN(value)) {
    setterFunction(value);
  }
};
