import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    app: {
      //textAlign: "center",
    },
    form: {
      maxWidth: "330px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      marginTop: "30px",
    },
  })
);
