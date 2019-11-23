import React, { useState } from "react";
import { Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

// local imports
import theme from "../theme";
import { loginUser } from "../auth";
import withApollo from "../apollo/with-apollo";
import Snackbar from "../Snackbar";

function Records() {
  const { data, loading } = useQuery(gql`
    query records {
      records {
        id
        title
        description
      }
    }
  `);
  if (loading) return <div>Loading... </div>;
  return data ? (
    <Container component="main" maxWidth="xs">
      {data.records.map(record => (
        <div key={record.id}>
          <h2>{record.title}</h2>
          <p>{record.description}</p>
        </div>
      ))}
    </Container>
  ) : null;
}

export default withApollo(Records);
