import jMoment from "jalali-moment";
const moment = require("moment");
export const convertDateToJalali = (d) => {
  try {
    var date = d.replace("-08:00", "");
  } catch (error) {
    var date = d;
  }

  return (
    <div className="date" title={jMoment(date).format("jYYYY/jMM/jDD")}>
      {moment(date).format("YYYY/MM/DD")}{" "}
      <span className="time">{moment(date).format("HH:mm")}</span>
    </div>
  );
};
