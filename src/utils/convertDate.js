import jMoment from "jalali-moment";
const moment = require("moment");
export const convertDateToJalali = (date) => {
  return (
    <div className="date" title={jMoment(date).format("jYYYY/jMM/jDD")}>
      {moment(date).zone("-08:00").local(true).format("YYYY/MM/DD")}{" "}
      <span className="time">
        {moment(date).zone("-08:00").local(true).format("HH:mm")}
      </span>
    </div>
  );
};
