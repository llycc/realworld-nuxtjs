function localSetItem(key, value) {
  if (!process.client) {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

function localGetItem(key) {
  if (!process.client) {
    return;
  }
  const value = window.localStorage.getItem(key);
  return value === undefined ? undefined : JSON.parse(value);
}
function localRemoveItem(key) {
  if (!process.client) {
    return;
  }
  window.localStorage.removeItem(key);
}
function localClear() {
  if (!process.client) {
    return;
  }
  window.localStorage.clear();
}

export const LocalStorageUtil = {
  getItem: localGetItem,
  setItem: localSetItem,
  removeItem: localRemoveItem,
  clear: localClear
};
