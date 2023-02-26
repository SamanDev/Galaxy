import Swal from "sweetalert2";
import { doCurrency } from "../const";
export const MyConfirm = (
  title,
  text,
  callBack,
  bonus,
  _bonuses,
  i,
  loginToken
) => {
  Swal.fire({
    title,
    html: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#21ba45",
    cancelButtonColor: "#db2828",
    confirmButtonText: "تایید",
    cancelButtonText: "بازگشت",
  }).then((result) => {
    if (result.isConfirmed) {
      callBack(bonus, _bonuses, i, loginToken);
    }
  });
};
export const MyDeposit = (title, text, openDeposit) => {
  Swal.fire({
    title,
    html: text,
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#21ba45",
    cancelButtonColor: "#db2828",
    confirmButtonText: "افزایش موجودی",
    cancelButtonText: "بازگشت",
  }).then((result) => {
    if (result.isConfirmed) {
      openDeposit();
    }
  });
};
export const MyToast = (title, icon) => {
  const Toast = Swal.mixin({
    toast: true,

    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon,
    title:
      "خطا:\n\n" +
      title
        .replace(
          "Error: Email is already in use!",
          "این ایمیل در گلکسی موجود است."
        )
        .replace(
          "Error: Username is already taken!",
          "این نام کاربری در گلکسی موجود است."
        ),
  });
};
export const MyToastActive = (title, handleOpenTable) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    confirmButtonText: "Open",
    padding: "1.2em",
    showCloseButton: true,
    buttonsStyling: false,
    customClass: {
      htmlContainer: "position-absolute p-2 lh-base",
      timerProgressBar: "bg-gold",
      actions: "",
      confirmButton: "ui button mini red",
    },
    background: "#000",
    timer: 3000,
    timerProgressBar: true,
  });

  Toast.fire({
    html:
      "<small class='text-gold lh-bold'>" +
      title.name +
      "</small><br/> is opened.",
  }).then((result) => {
    if (result.isConfirmed) {
      handleOpenTable(title.name);
    }
  });
};
