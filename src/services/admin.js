import { httpService } from "./httpService";
export const adminGetService = (mode) => {
  return httpService("/admin/" + mode, "get");
};
export const adminPostService = (values, mode) => {
  return httpService("/admin/" + mode, "post", {
    ...values,
  });
};
export const adminPutService = (values, mode) => {
  return httpService("/admin/" + mode, "put", {
    ...values,
  });
};
export const adminPutServiceList = (values, mode) => {
  return httpService("/admin/" + mode, "put", values);
};
export const getReportServiceAdmin = (mode) => {
  return httpService(`/req/${mode}`, "get");
};
export const notification = (username, message, title, image) => {
  return httpService("/admin/notification", "post", {
    username,
    message,
    title,
    image,
  });
};
