import React from "react";
import AddToCalendarHOC from "react-add-to-calendar-hoc";

import {
  Statistic,
  Button,
  Icon,
  Divider,
  Grid,
  Segment,
  Accordion,
  Header,
  List,
  Dropdown,
} from "semantic-ui-react";
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
function getchatTime(date) {
  var thisDate2 = date;
  var dateExpired = moment(thisDate2).local().format("YYYYMMDDTHHmmss");

  return dateExpired;
}
class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var now = moment().format("YYYYMMDDTHHmmss");
    var nowDay = moment(now).date();
    var start = parseInt(this.props.start);
    var dur = parseInt(this.props.dur);
    var dir = start - nowDay;
    var end = start + dur;
    var _next = false;
    var _start = false;
    var _finish = false;
    if (start <= nowDay) {
      _start = true;
    }
    if (end - nowDay < 0) {
      _finish = true;
    }
    if (dir < 0) {
      _next = true;
    }

    if (_finish) {
      now = moment(now).add(1, "months").format("YYYYMMDDTHHmmss");
      _next = false;
    }

    var startDatetime = moment(now).add(dir, "days").format("YYYYMMDDT000000");
    var startDatetimeOld = startDatetime;
    var endDatetimeOld = moment(startDatetimeOld)
      .add(dur, "days")
      .format("YYYYMMDDTHHmmss");

    if (_next) {
      startDatetime = moment(startDatetime)
        .add(1, "months")
        .format("YYYYMMDDT000000");
    }

    const endDatetime = moment(startDatetime)
      .add(this.props.dur, "days")
      .format("YYYYMMDDTHHmmss");
    const duration = this.props.dur;
    var startTime = getchatTime(startDatetime);
    var endTime = getchatTime(endDatetime);
    const event = {
      duration,
      endDatetime: endTime,

      startDatetime: startTime,
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
            left: -4,
            zIndex: 10,
          }}
        >
          {args.children.map((link, i) => (
            <Button
              key={i}
              color="grey"
              className="add-to-container"
              style={{ padding: 0 }}
            >
              {link}
            </Button>
          ))}
        </Button.Group>
      </>
    );

    const ATCWrapper = (args) => (
      <>
        {(_next || _start) && !_finish ? (
          <Moment
            className="farsi-inline ui label yellow fluid"
            to={endDatetimeOld}
            filter={toEnd}
            style={{ marginTop: 20 }}
            onChange={(val) => {}}
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
              className="farsi-inline"
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

    return <AddToCalendarDropdown event={event} />;
  }
}
export default Example;
