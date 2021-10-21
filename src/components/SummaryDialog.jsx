import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ApiCalendar from "react-google-calendar-api";

export default function FormDialog(props) {
  const [summary, setSummary] = React.useState("");

  const addEvent = () => {
    let newEvent = {
      summary: summary,
      description: "",
      start: {
        dateTime: new Date(props.newEvent.start),
        timeZone: "Europe/Paris",
      },
      end: { dateTime: new Date(props.newEvent.end), timeZone: "Europe/Paris" },
    };
    ApiCalendar.createEvent(newEvent)
      .then((result) => {
        let newEvents = props.events;
        newEvents.push({
          id: result.result.id,
          title: result.result.summary,
          start: new Date(result.result.start.dateTime),
          end: new Date(result.result.end.dateTime),
        });
        props.setEvents(newEvents);
        props.setAdded(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>New event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To successfully add the new event, please write a summary.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Summary"
            type="text"
            fullWidth
            variant="standard"
            onChange={(input) => {
              setSummary(input.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={() => {
              addEvent();
              props.onClose();
              setSummary("");
            }}
            disabled={summary !== "" ? false : true}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
