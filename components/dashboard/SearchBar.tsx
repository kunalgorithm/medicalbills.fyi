import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

// local imports
import theme from "../theme";
import { loginUser } from "../auth";
import withApollo from "../apollo/with-apollo";
import Snackbar from "../Snackbar";
import Records from "./Records";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SearchBar() {
  const classes = useStyles(theme);

  const [search, setSearch] = useState("");

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Search For Medical Procedures
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="search"
            label="Medical Procedure"
            name="search"
            autoComplete="search"
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>
      <Records search={search} />
    </Container>
  );
}

export default withApollo(SearchBar);
