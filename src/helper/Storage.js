export const storageGetData = (key = "category") => {
  let data = localStorage.getItem(key);
  return data === undefined || data === null ? [] : JSON.parse(data);
};
export const storageSetData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
