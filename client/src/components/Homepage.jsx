import "./Homepage.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const Homepage = () => {
    
    return (<>
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div style={{marginLeft:"10%"}}>
          <img src={"https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/tbvbvipimh2camf5nb2q"} height="45px" alt="" />
          </div>
          <Typography variant="h5" component="div">Unsplash</Typography>
          <TextField label="Search by name" sx={{ml:10}} style={{width:"35%"}}/>
          <Grid container justifyContent="flex-end">
          <Button variant="contained" color="success" align="right">Add a photo</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    </>)
}