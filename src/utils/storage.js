export const getItem = (key) => {
  let value = null;
  try {
    const result = window.localStorage.getItem(key);
    if (result) {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};

export const getStringItem = (key) => {
  return localStorage.getItem(key);
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const clearItems = () => {
  localStorage.clear();
};
