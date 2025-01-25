export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return null;
  }
};

export default {
  setItem,
  getItem,
};
