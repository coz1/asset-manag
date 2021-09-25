import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FC, useState } from "react";
import useStyles from "./styles/LoginStyle";

type Props = {};

const Login: FC<Props> = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleChange = (e) => {};

  return (
    <>
      <div className="app">
        <form className="form">
          <TextField id="outlined-name" label="Name" />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button>Login</Button>
        </form>
      </div>
    </>
  );
};

export default Login;
