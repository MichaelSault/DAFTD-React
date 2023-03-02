import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

export default function Login() {
  const [returnedData, setReturnedData] = useState({OwnerID: 0, Name: '', Email: '', Password: ''});
  const [owner, setOwner] = useState({Email: '', Password: ''})

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(returnedData);
    console.log({
      Email: data.get('Email'),
      Password: data.get('Password'),
    });
  };

  const fetchOwnerData = async () => {
    
    const newData = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Email: owner.Email,
        Password: owner.Password
      })
    })
    .then(res => res.json());
    console.log("CALLED API2");
    console.log(newData);
    setReturnedData(newData)
  }


  const setInput = (e) => {
    const {name, value} = e.target;
    console.log(value);
    if (name === 'OwnerID'){
      setOwner(prevState => ({
        ...prevState,
        [name]: parseInt(value)
      }));
      return;
    }
    setOwner(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?dog)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid backgroundColor ='#282c34' item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'saddlebrown', color: 'white', fontSize: 'large' }}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                onChange={setInput}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={setInput}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => fetchOwnerData()}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {<Link href="#" variant="body2">
                    Forgot password?
                  </Link>}
                </Grid>
                <Grid item>
                 {<Link href="SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}