import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ApiCalendar from "react-google-calendar-api";
import DeleteDialog from "./DeleteDialog";
import SummaryDialog from "./SummaryDialog";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function MyCalendar(props) {
  const [events, setEvents] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [added, setAdded] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const deleteEvent = () => {
    ApiCalendar.deleteEvent(deleteId)
      .then((result) => {
        let newEvents = [];
        events.forEach((event) =>
          event.id === deleteId ? null : newEvents.push(event)
        );
        setEvents(newEvents);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (events.length === 0 || added) {
      if (!added) {
        ApiCalendar.onLoad(() => {
          ApiCalendar.listEvents({
            timeMin: new Date(new Date().getFullYear(), 0, 1).toISOString(),
            timeMax: new Date().addDays(1095).toISOString(),
            orderBy: "updated",
          })
            .then((result) => {
              let newEvents = [];
              result.result.items.forEach((item) => {
                newEvents.push({
                  id: item.id,
                  title: item.summary,
                  start: new Date(item.start.dateTime),
                  end: new Date(item.end.dateTime),
                });
              });
              setEvents(newEvents);
            })
            .catch((e) => console.log(e));
        });
      }
      setAdded(false);
    }
  });

  return (
    <>
      <DeleteDialog
        onClose={handleCloseDelete}
        open={openDelete}
        onDelete={deleteEvent}
      />

      <SummaryDialog
        open={props.openSummary}
        onClose={props.closeSummary}
        events={events}
        setEvents={setEvents}
        newEvent={props.newEvent}
        setAdded={setAdded}
      />
      <Calendar
        localizer={localizer}
        events={events ? events : null}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        style={{ height: "85vh" }}
        selectable={true}
        onSelectEvent={(event) => {
          setDeleteId(event.id);
          handleOpenDelete();
        }}
        onSelecting={(event) => {
          props.setNewEvent(event);
        }}
      />
    </>
  );
}

export default MyCalendar;
