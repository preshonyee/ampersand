const storeUser = (user: string) => {
  return localStorage.setItem("user", user);
};

const getStoredUser = () => {
  return localStorage.getItem("user");
};

const removeStoredUser = () => {
  return localStorage.deleteItem("user");
};

export { storeUser, getStoredUser, removeStoredUser };
