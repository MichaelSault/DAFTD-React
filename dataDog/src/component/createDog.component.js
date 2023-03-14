import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#282c34"
        }
    }
});

export default function CreateDog() {
    const [returnedData, setReturnedData] = useState({DogID: 0, Name: '', FeedTime: '', Breed: '', AdoptDate: '', Age: ''});
    const [dog, setDog] = useState({DogID: 0, Name: '', FeedTime: '', Breed: '', AdoptDate: '', Age: ''});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        ownerName: data.get('ownerName'),
        email: data.get('email'), 
        password: data.get('password'),
    });
  };

  const setInput = (e) => {
    const {name, value} = e.target;
    console.log(value);
    if (name === 'EmployeeID' || name === 'Age'){
      setDog(prevState => ({
        ...prevState,
        [name]: parseInt(value)
      }));
      return;
    }
    setDog(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const createDogProfile = async () => {
    const newData = await fetch('http://localhost:5000/createDog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...dog
      })
    })
    .then(res => res.json());
    console.log(newData);
    setReturnedData(newData[0])
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'saddlebrown', color: 'white', fontSize: 'large' }}>
              <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Dog
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="dog-name"
                  name="dogName"
                  required
                  fullWidth
                  id="dogName"
                  label="Name"
                  onChange={setInput}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="dog-breed"
                  name="dogBreed"
                  fullWidth
                  id="dogBreed"
                  label="Breed"
                  onChange={setInput}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="adopt-date"
                    name="adoptDate"
                    fullWidth
                    id="adoptDate"
                    label="Adoption Date"
                    onChange={setInput}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="dog-age"
                    name="dogAge"
                    fullWidth
                    id="dogAge"
                    label="Age"
                    onChange={setInput}
                    autoFocus
                  />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => createDogProfile()}
            >
               Add Dog
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}