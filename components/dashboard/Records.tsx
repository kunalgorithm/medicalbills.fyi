import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

// local imports
import theme from "../theme";
import { loginUser } from "../auth";
import withApollo from "../apollo/with-apollo";
import Snackbar from "../Snackbar";
import Orders from "./Orders";

function Records({ search }: { search: string }) {
  const { data, loading } = useQuery(
    gql`
      query records($search: String) {
        records(search: $search) {
          id
          title
          description
          state
          total_discharges
          avg_covered_charges
          avg_total_payments
          avg_medicare_payments
        }
      }
    `,
    { variables: { search } }
  );
  if (loading) return <div>Loading... </div>;
  return data ? (
    <Container component="main">
      <Grid>
        <Orders records={data.records} />
      </Grid>
    </Container>
  ) : null;
}

export default withApollo(Records);
