import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "@mui/lab/DatePicker";
import { useTheme } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const Form = ({ course, setForm, control, watch }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const type = watch("type");

  const handleSubmit = async () => {
    const postReq = fetch("/placeorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderDetails: generateConfirmation(),
        course: course.courseName,
        imgSrc: `${process.env.PUBLIC_URL}/assets/${course.folder}/${
          course.assets.holes[watch("holeIndex")]?.url
        }`,
        ...watch(),
      }),
    }).then((res) => {
      if (res.status === 500)
        throw new Error("Could not reach ordering servers");
      if (res.status === 400) throw new Error("Invalid Form");
      if (res.status !== 201) throw new Error("Something went wrong");
    });
    toast.promise(postReq, {
      loading: "Submitting your order...",
      success: () => `Successfully placed order!`,
      error: (err) => "" + err,
    });

    setOpen(false);
  };

  const isValid = () => {
    const form = watch();
    // eslint-disable-next-line
    const emailRegex =
      /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;
    if (!emailRegex.test(form.email)) return false;
    switch (type) {
      case "art":
        return true;
      case "hio":
        if (!form.hio.playerName) return false;
        if (!form.hio.distance) return false;
        if (!form.hio.date) return false;
        return true;
      case "event":
        if (!form.event.playerNames) return false;
        if (!form.event.awardName) return false;
        return true;
      default:
        return false;
    }
  };

  const generateConfirmation = () => {
    const response = watch();
    let fields = [];
    fields.push("Course: " + course.courseName);
    fields.push("Frame Color: " + response.color);
    fields.push("Frame Size: " + response.size);
    fields.push("Hole: " + course.assets.holes[response.holeIndex].description);
    switch (type) {
      case "art": {
        fields.push("Type: Framed Photo Art");
        break;
      }
      case "event": {
        fields.push("Type: Event Award");
        fields.push("Player Name(s): " + response.event.playerNames);
        fields.push("Award Name: " + response.event.awardName);
        break;
      }
      case "hio": {
        fields.push("Type: Hole In One");
        fields.push("Date: " + response.hio.date.format("MMMM D, YYYY"));
        fields.push("Player Name: " + response.hio.playerName);
        fields.push(
          "Club Used: " + (response.hio.clubUsed || "No club provided")
        );
        fields.push("Distance: " + response.hio.distance);
        fields.push(
          "Witness 1: " + (response.hio.witnesses[0] || "No witness provided")
        );
        fields.push(
          "Witness 2: " + (response.hio.witnesses[1] || "No witness provided")
        );
        fields.push(
          "Witness 3: " + (response.hio.witnesses[2] || "No witness provided")
        );
        break;
      }
      default: {
        console.error("Invalid type");
        break;
      }
    }

    fields.push("Notes: " + (response.notes || "No notes provided"));

    return fields;
  };

  return (
    <>
      <Toaster
        position="bottom-center"
        gutter={8}
        toastOptions={{
          // Define default options
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Confirm Order Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {generateConfirmation().map((text) => (
              <Typography variant="h6">{text}</Typography>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Go Back</Button>
          <Button onClick={handleSubmit} autoFocus>
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        spacing={2}
        style={{
          width: "95%",
          margin: "auto",
          border: "2px solid",
          padding: 4,
          borderRadius: 15,
          borderColor: theme.palette.primary.main,
        }}
      >
        <Grid item xs={3}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="dense">
                <InputLabel id="type-label">Frame Format</InputLabel>
                <Select
                  size="small"
                  {...field}
                  label="Frame Format"
                  labelId="type-label"
                >
                  <MenuItem value="art">Framed Photo Art</MenuItem>
                  <MenuItem value="hio">Hole In One</MenuItem>
                  <MenuItem value="hiowb">
                    Hole In One w/ Ball Insert (+$25)
                  </MenuItem>
                  <MenuItem value="event">Event Award</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="dense">
                <InputLabel id="color-label">Frame Color</InputLabel>
                <Select
                  size="small"
                  {...field}
                  label="Frame Color"
                  labelId="color-label"
                >
                  <MenuItem value="brown">Brown Mahogany</MenuItem>
                  <MenuItem value="red">Red Mahogany</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="dense">
                <InputLabel id="size-label">Frame Size</InputLabel>
                <Select
                  size="small"
                  {...field}
                  label="Frame Size"
                  labelId="size-label"
                >
                  <MenuItem value="20x10">20x10</MenuItem>
                  <MenuItem value="24x12">24x12</MenuItem>
                  <MenuItem value="30x15">30x15</MenuItem>
                  <MenuItem value="40x20">40x20</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="holeIndex"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="dense">
                <InputLabel id="holeIndex-label">Photo</InputLabel>
                <Select
                  size="small"
                  {...field}
                  label="Photo"
                  labelId="holeIndex-label"
                >
                  {course.assets.holes.map((hole, index) => (
                    <MenuItem value={index} key={index}>
                      {hole.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={3}>
          {(type === "hio" || type === "hiowb") && (
            <>
              <Controller
                name="hio.playerName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Player Name"
                    variant="outlined"
                    {...field}
                    fullWidth
                    margin="dense"
                    required
                  />
                )}
              />
              <Controller
                name="hio.clubUsed"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Club Used"
                    variant="outlined"
                    {...field}
                    fullWidth
                    margin="dense"
                  />
                )}
              />
              <Controller
                name="hio.date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Date"
                    variant="outlined"
                    {...field}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        margin="dense"
                        required
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="hio.distance"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Distance"
                    variant="outlined"
                    type="number"
                    {...field}
                    fullWidth
                    margin="dense"
                    required
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">yards</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </>
          )}

          {type === "event" && (
            <>
              <Controller
                name="event.playerNames"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Player Name(s)"
                    variant="outlined"
                    {...field}
                    fullWidth
                    margin="dense"
                    required
                  />
                )}
              />
              <Controller
                name="event.awardName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Award Name"
                    variant="outlined"
                    {...field}
                    fullWidth
                    margin="dense"
                    required
                  />
                )}
              />
            </>
          )}
        </Grid>
        <Grid item xs={3}>
          {(type === "hio" || type === "hiowb") && (
            <>
              <Controller
                name="hio.witnesses.0"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Witness 1"
                    variant="outlined"
                    {...field}
                    fullWidth
                    margin="dense"
                    placeholder="John Smith"
                  />
                )}
              />
              <Controller
                name="hio.witnesses.1"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Witness 2"
                    variant="outlined"
                    {...field}
                    fullWidth
                    margin="dense"
                    placeholder="Jane Doe"
                  />
                )}
              />
              <Controller
                name="hio.witnesses.2"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Witness 3"
                    variant="outlined"
                    {...field}
                    fullWidth
                    margin="dense"
                    placeholder="Billy Walters"
                  />
                )}
              />
            </>
          )}
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h5"
            align="center"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Order Form
          </Typography>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                label="Notes"
                variant="outlined"
                {...field}
                fullWidth
                margin="dense"
                multiline
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                required
                size="small"
                label="Email"
                variant="outlined"
                {...field}
                fullWidth
                margin="dense"
              />
            )}
          />
          <Button
            disabled={!isValid()}
            onClick={() => setOpen(true)}
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
