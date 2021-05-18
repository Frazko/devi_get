import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createGameActionCreator } from '../store/reducers/minesweeperReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://www.linkedin.com/in/murillo/">
        <LinkedInIcon />
      </Link>
    </Typography>
  );
}

const StyledAlert = styled.div`
  background-color: red;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  margin: 15px;
  padding: 15px;
  border-radius: 5px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [mines, setMines] = useState('')
  const [cols, setCols] = useState('')
  const [showWarning, setShowWarning] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!cols || !mines) {
      setShowWarning(true);
      return
    }
    const gameDetails = {
      rows: cols,
      cols: cols,
      mines,
    }
    dispatch(createGameActionCreator(gameDetails))

    console.log('REDIRECTING: ');
    history.push("/board");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create a Game
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mines"
              name="mines"
              label="Number of Mines"
              autoFocus
              onChange={event => setMines(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="columns"
              label="Grid Size"
              id="columns"
              onChange={event => setCols(event.target.value)}
            />
            {showWarning && <StyledAlert>
              Please fill all spaces
            </StyledAlert>}
            <Button
              role="button"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Build Board
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

