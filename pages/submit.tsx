import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import theme from "../components/theme";
import { useRouter } from "next/router";
import Snackbar from "../components/Snackbar";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { loginUser } from "../components/auth";
import withApollo from "../components/apollo/with-apollo";

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SIGNUP_MUTATION = gql`
  mutation createRecord($title: String!, $description: String!) {
    createRecord(title: $title, description: $description) {
      title
      description
    }
  }
`;

function SignUp() {
  const router = useRouter();
  const classes = useStyles(theme);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSucess] = useState(null);

  const [createRecord, { loading, error, data, client }] = useMutation(
    SIGNUP_MUTATION
  );

  return (
    <Container component="main" maxWidth="xs">
      {error && <Snackbar message={error.message} />}
      {success && <Snackbar message={success} />}

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Submit a Record
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            createRecord({
              variables: { title, description }
            })
              .then(result => {
                setTitle("");
                setDescription("");
                setSucess("Record Created!");
              })
              .catch(err => console.error(err));
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withApollo(SignUp);
