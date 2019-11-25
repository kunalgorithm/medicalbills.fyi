/* eslint-disable no-script-url */

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import theme from "../theme";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Orders({ records }) {
  const classes = useStyles(theme);
  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Procedure</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Total Discharges</TableCell>
            <TableCell>Average Covered Charges</TableCell>
            <TableCell>Average Total Payments</TableCell>
            <TableCell align="right">Average Medicare Payments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.total_discharges}</TableCell>
              <TableCell>{row.avg_covered_charges}</TableCell>
              <TableCell>{row.avg_total_payments}</TableCell>
              <TableCell align="right">{row.avg_medicare_payments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="/">
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}
