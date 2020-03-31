import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  // root: {
  //   flexGrow: 1,
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },

  center: {
    textAlign: 'center'
  },
  container: {
    display:'flex',
  },
  item: {
    flexGrow: 1,
    textAlign: 'center',
    height: '50px',
    lineHeight: '50px',
backgroundColor: 'red',
margin: 1,
width: 40,
  }
}));
// const Grid = styled(GridBase)`
//   .MuiGrid-root {
//     flex-grow: 1;
//   }
// `

function Problems() {
  const classes = useStyles();
  const [clicks, setClicks] = useState(0)

  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const rows = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].reverse();

  // for (var i=18, rows=[]; i--;) rows.push(rows.length+1);

  return <>

    <div >

    <h1 className={classes.center}>Problems ({clicks})</h1>

    {/*<div className={classes.root}>*/}
    {/*<Grid container direction="row" justify="space-around" alignItems="center">*/}
    {/*  /!*<Grid item><Paper>A</Paper></Grid>*!/*/}
    {/*  {columns.map(coumn => <Grid item xs={1} style={{height: 20}}><Paper>{coumn}</Paper></Grid>)}*/}
    {/*</Grid>*/}
    {/*  {rows.map(row =>*/}
    {/*    <Grid container item xs={12} direction="row" justify="space-around" alignItems="center" >*/}
    {/*      {columns.map(coumn => <Grid item xs={1}><Paper>X</Paper></Grid>)}*/}
    {/*    </Grid>*/}
    {/*  )}*/}


    {/*</div>*/}

      <div className={classes.container}>
        <div className={classes.item}></div>
        {columns.map(coumn => <div className={classes.item} onClick={() => setClicks(clicks+1)}>{coumn}</div>)}
        {/*{columns.map((coumn, i) => <div className={classes.item}>{coumn + i}</div>)}*/}

      </div>
      {/*<div className={classes.container}>*/}
      {/*  {columns.map(coumn => <div className={classes.item}>{coumn}</div>)}*/}
      {/*  /!*{columns.map((coumn, i) => <div className={classes.item}>{coumn + i}</div>)}*!/*/}

      {/*</div>*/}

      {rows.map((row, i) => <div className={classes.container}>
        <div className={classes.item}>{row}</div>
        {columns.map(column => <div className={classes.item} onClick={() => setClicks(clicks+1)}>{column}{row}</div>)}
      </div>)}


    </div>

  </>
}
export default Problems;
