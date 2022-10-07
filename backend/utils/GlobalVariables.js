const GlobalVariables = {
  C_REGISTER_MISSING_NAME: 400,
  M_REGISTER_MISSING_NAME: "Register missing name field",
  C_REGISTER_MISSING_PASSWORD: 401,
  M_REGISTER_MISSING_PASSWORD: "Register missing password field",
  C_REGISTER_MISSING_PHONE: 402,
  M_REGISTER_MISSING_PHONE: "Register missing phone field",
  C_REGISTER_PHONE_EXISTED: 403,
  M_REGISTER_PHONE_EXISTED: "Phone number already in use",
  C_REGISTER_FAILED: 500,
  M_REGISTER_FAILED: "Failed to create new user",

  C_LOGIN_NOTFOUND: 404,
  M_LOGIN_NOTFOUND: "Phone number is not registered",
  C_LOGIN_WRONGPASSWORD: 405,
  M_LOGIN_WRONGPASSWORD: "Password is not correct",
};

module.exports = GlobalVariables;
