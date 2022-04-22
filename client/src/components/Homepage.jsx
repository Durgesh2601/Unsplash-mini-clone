import "./Homepage.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Masonry from '@mui/lab/Masonry';
import React, { useState, useEffect } from 'react';


export const Homepage = () => {
   const [posts, setPosts] = useState([]);
   useEffect(() => {
    getPosts();
   },[])
   const getPosts = () => {
       fetch("http://localhost:3000/").then((d) => d.json()).then((res) => {
           setPosts(res);
       });
   }
//    const mouseEnter = (e) => {
//      e.target.style.visibility="visible";
//      console.log(e)
//    }
//    const onMouseLeave = (e) => {
//     e.target.style.visibility="hidden";
//  }
   
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
    <div className="conatiner">
    <Box sx={{ width: 1300, minHeight: 829 }}>
      <Masonry columns={3} spacing={4}>
        {posts.map((e, index) => (
          <div key={e._id} className="postDiv">
            <img
              src={`${e.pic}?w=162&auto=format`}
              srcSet={`${e.pic}?w=162&auto=format&dpr=2 2x`}
              alt={e.label}
              loading="lazy"
              style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                }}
                />
            {/* <Typography variant="p" component="div" align="center" style={{backgroundColor:"black", color:"white"}} onMouseEnter={mouseEnter} onMouseLeave={onMouseLeave}>{e.label}</Typography> */}
          </div>
        ))}
      </Masonry>
    </Box>
    </div>
    </>)
}