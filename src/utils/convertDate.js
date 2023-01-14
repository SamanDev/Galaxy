import jMoment from "jalali-moment";
import Moment from "react-moment";
const moment = require("moment");
export const convertDateToJalali = (date) => {
  return (
    <div className="date" title={jMoment(date).format("jYYYY/jMM/jDD")}>
      {moment(date).format("YYYY/MM/DD")}{" "}
      <span className="time">{moment(date).format("HH:mm")}</span>
    </div>
  );
};
