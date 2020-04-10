import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
  container: {
    display: "flex",
  },
  item: {
    flexGrow: 1,
    textAlign: "center",
    height: "50px",
    lineHeight: "50px",
    margin: 1,
    width: 40,
    fontSize: ".7em",
    border: "1px solid #ececec",
  },
  buffer: {
    paddingBottom: 70,
    paddingTop: 5,
  },
  header: {
    backgroundColor: "whitesmoke",
  },
  selected: {
    background: "springgreen",
  },
}));

export default useStyles;
