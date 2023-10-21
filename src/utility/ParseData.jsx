export const ParseData = (label) => {
  return JSON.parse(localStorage.getItem(label));
};

export const localStorageSetter = (label, jsonData) => {
  try {
    localStorage.setItem(label, JSON.stringify(jsonData));
  } catch (err) {
    return false;
  }
  return true;
};

export const localStorageGetter = (label) =>
  JSON.parse(localStorage.getItem(label));
