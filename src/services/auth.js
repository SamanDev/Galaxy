import httpService from "./httpService";

export const loginService = (values) => {
  return httpService("/auth/signin", "post", {
    ...values,
  });
};
export const registerService = (values) => {
  return httpService("/auth/signup", "post", {
    ...values,
  });
};
export const forgetPasswordService = (values) => {
  return httpService("/auth/forgetPassword", "post", {
    ...values,
  });
};

export const logoutService = () => {
  return httpService("/auth/logout", "get");
};

export const getUserService = () => {
  return httpService("/req/getUser", "get");
};
