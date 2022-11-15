export const isValidUsername = (username: string) =>
  /^[a-z0-9-]*$/.test(username);

export const isValidPassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};
