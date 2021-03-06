import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { useStyles, StyledTableCell, StyledTableRow } from "./Table.styles";
import TablePaginationActions from "../Pagination/Pagination";

interface UserData {
  email: string;
  name: string;
  age: number;
  birthDate: string;
  city: string;
}

interface ITableProps {
  data: Array<UserData>;
}

const TableComponent: React.FC<ITableProps> = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHeaders = ["Name", "Email", "Age", "Date of Birth", "City"];

  const dataSample = [
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
    {
      email: "val@gmail.com",
      name: "Valentine Ezeh",
      birthDate: "14-02-1988",
      age: 33,
      city: "Lagos, Nigeria",
    },
  ];

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((i, index) => (
                <StyledTableCell key={index}>{i}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSample.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.age}</StyledTableCell>
                <StyledTableCell>{row.birthDate}</StyledTableCell>
                <StyledTableCell>{row.city}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 100, 1000, 10000]}
                colSpan={3}
                count={dataSample.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
