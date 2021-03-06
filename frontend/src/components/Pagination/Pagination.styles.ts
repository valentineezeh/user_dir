import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const paginationStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);
