import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Loader from "react-loader-spinner";
import { useStyles, StyledTableCell, StyledTableRow } from "./Table.styles";
import TablePaginationActions from "../Pagination/Pagination";
import { UserData, fetchUsers } from "./TableSlice";
import { RootState } from "../../store/store";

interface ITableProps {
  data: Array<UserData>;
}

const TableComponent: React.FC<ITableProps> = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

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

  useEffect(() => {
    const queryObject = { page, rowsPerPage };
    dispatch(fetchUsers(queryObject));
  }, [dispatch, page, rowsPerPage]);

  let { users, usersMeta, isLoading } = useSelector((state: RootState) => ({
    users: state.tableReducer.users ?? [],
    usersMeta: state.tableReducer.usersMeta ?? { limit: 0, page: 0, total: 0 },
    isLoading: state.tableReducer.isLoading,
  }));

  const tableHeaders = ["Name", "Email", "Age", "Date of Birth", "City"];

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
            {isLoading ? (
              <Grid className={classes.loader}>
                <Loader type="Circles" color="#262262" height={50} width={50} />
              </Grid>
            ) : (
              users.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.age}</StyledTableCell>
                  <StyledTableCell>
                    {moment(row.birthDate).format("LL")}
                  </StyledTableCell>
                  <StyledTableCell>{row.city}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {!isLoading && (
                <TablePagination
                  rowsPerPageOptions={[10, 50, 100, 1000, 10000]}
                  colSpan={3}
                  count={usersMeta.total}
                  rowsPerPage={usersMeta.limit}
                  page={usersMeta.page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
