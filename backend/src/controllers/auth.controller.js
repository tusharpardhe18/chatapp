export const signup = (req, res) => {
  const { nickName, email, password } = req.body;
  try {
    res.send("signup");
  } catch (error) {}
};
export const login = (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};
