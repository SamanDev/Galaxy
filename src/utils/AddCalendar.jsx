import React from "react";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import $ from "jquery";
import { Button, Icon } from "semantic-ui-react";
import Moment from "react-moment";
const moment = require("moment");
moment.updateLocale("en", {
  relativeTime: {
    future: "%s مانده",
    past: "%s قبل",
    s: "چند ثانیه",
    ss: "%d ثانیه",
    m: "یک دقیقه",
    mm: "%d دقیقه",
    h: "یک ساعت",
    hh: "%d ساعت",
    d: "یک روز",
    dd: "%d روز",
    w: "یک هفته",
    ww: "%d هفته",
    M: "یک ماه",
    MM: "%d ماه",
    y: "یک سال",
    yy: "%d سال",
  },
});
var SHARE_SITES = {
  ICAL: "به تقویم من اضافه کن",
};
const zones = "+04:30";
function getchatTime(date) {
  var thisDate2 = date;
  var dateExpired = moment(thisDate2).format("YYYYMMDDTHHmmss" + zones);

  return dateExpired;
}

class Example extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.clicklink();
  }
  clicklink = (args) => {
    $(".calbtn").trigger("click").hide();
  };
  render() {
    var now = moment().format("YYYYMMDDTHHmmssZ");
    now = moment(now)
      .utc()
      .zone(zones)
      .format("YYYYMMDDTHHmmss" + zones);

    var nowDay = moment(now).date();
    var nowMonth = moment(now).month();
    var start = parseInt(this.props.start);
    var dur = parseInt(this.props.dur);
    var dir = start - nowDay;
    var end = start + dur;
    var _next = false;
    var _start = false;
    var _finish = false;
    var __start = moment(now)
      .set({ date: start })
      .format("YYYYMMDDT" + this.props.format + "00");

    if (start <= nowDay) {
      _start = true;
    }
    if (end - nowDay < 0) {
      _finish = true;
    }
    if (dir < 0) {
      _next = true;
    }

    if (end > 31) {
      var today = new Date();

      end = 1;
    }

    var startDatetimeOld = getchatTime(__start);
    if (_finish) {
      //now = moment(now).add(1, "months").format("YYYYMMDDTHHmmssZ");
      __start = moment(__start)
        .set({ month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.format + "00");

      _next = false;
    }

    if (_next) {
      __start = moment(__start)
        .set({ month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.format + "00");
    }

    var __end = moment(__start)
      .set({ date: end })
      .format("YYYYMMDDT" + this.props.format + "00");
    var __endOld = moment(__end).format("YYYYMMDDT" + this.props.format + "00");
    if (__end < __start) {
      __end = moment(__start)
        .set({ date: end, month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.format + "00");
    }

    const duration = this.props.dur;
    var startTime = getchatTime(__start);
    var endTime = getchatTime(__end);
    var endDatetimeOld = getchatTime(__endOld);

    const event = {
      duration,
      //endDatetime: endTime,
      repeat: this.props.repeat,

      startDatetime:
        moment.parseZone(startTime).utc().format("YYYYMMDDTHHmmss") + "Z",
      endDatetime:
        moment.parseZone(endTime).utc().format("YYYYMMDDTHHmmss") + "Z",
      title: this.props.title,
    };

    const toStart = (d) => {
      return d + " تا شروع";
    };
    const toEnd = (d) => {
      return d + " تا پایان";
    };

    const ATCDropdown = (args) => (
      <>
        <Button.Group
          vertical
          size="mini"
          fluid
          style={{
            position: "relative",

            zIndex: 10,
          }}
        >
          {args.children.map((link, i) => (
            <Button
              key={i}
              color="red"
              icon
              labelPosition="left"
              fluid
              className="farsi add-to-container"
              style={{ margin: "10px 0" }}
            >
              <Icon name="calendar plus outline" />
              {link}
            </Button>
          ))}
        </Button.Group>
      </>
    );
    var a = moment(now).utc();
    var b = moment(endDatetimeOld).utc();
    // 86400000

    const ATCWrapper = (args) => (
      <>
        {1 == 2 && (
          <>
            {" "}
            now: {now}
            <br />
            startTime: {startTime}
            <br />
            endTime: {endTime}
            <br />
            startDatetimeOld: {startDatetimeOld}
            <br />
            endDatetimeOld: {endDatetimeOld}
            <br />
            {a.diff(b, "hours")}
            <br />
            {a.diff(b, "seconds")}
            <br />
            _next: {_next.toString()}
            <br />
            _start: {_start.toString()}
            <br />
            _finish: {_finish.toString()}
            <br />
          </>
        )}

        {((_next && a < b) || (_start && startTime < now)) && !_finish ? (
          <Moment
            className="farsi-inline ui label green fluid"
            to={endDatetimeOld}
            filter={toEnd}
            style={{ marginTop: 20 }}
            onChange={(val) => {
              console.log(val);
            }}
          >
            {now}
          </Moment>
        ) : (
          <>
            <Moment
              className="farsi-inline ui label grey fluid"
              fromNow
              filter={toStart}
              style={{ marginTop: 20 }}
              onChange={(val) => {}}
            >
              {startTime}
            </Moment>

            <Button
              onClick={args.onClick}
              color="red"
              icon
              labelPosition="left"
              fluid
              className="farsi-inline calbtn"
              style={{ margin: "10px 0" }}
            >
              <Icon name="calendar plus outline" />
              به تقویم من اضافه کن
            </Button>
          </>
        )}
      </>
    );
    const AddToCalendarDropdown = AddToCalendarHOC(ATCWrapper, ATCDropdown);

    return (
      <AddToCalendarDropdown
        event={event}
        filename={event.title}
        items={[SHARE_SITES.ICAL]}
        linkProps={{
          className: "ui link",
        }}
      />
    );
  }
}
export default Example;
