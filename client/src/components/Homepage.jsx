import "./Homepage.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {Button, Input} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Modal from '@mui/material/Modal';
import {DropzoneArea} from 'material-ui-dropzone'
import React, { useState, useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 10,
  };
export const Homepage = () => {
   const [posts, setPosts] = useState([]);
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   useEffect(() => {
    getPosts();
   },[])
   const getPosts = () => {
       fetch("http://localhost:3000/").then((d) => d.json()).then((res) => {
           setPosts(res);
       });
   }
   const handleFile = (e) => {
     console.log(e.target);
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
          <Button variant="contained" color="success" align="right" onClick={handleOpen}>Add a photo</Button>
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
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box sx={style}>
    <Typography id="modal-modal-title" variant="h4" component="h3" align="center">
      Upload your image
    </Typography>

    <Typography id="modal-modal-description" align="center" varaiant="subtitle2" mt={2}>
      File should be Jpeg, Png...
    </Typography> <br />
    <DropzoneArea
        onChange={handleFile}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}/>
        <p style={{textAlign:"center"}}>or</p>
        <Button variant="contained" sx={{mt:2, ml:17}} align="center">Choose a file</Button>
        <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">Upload</Button></label>
    </Box>
    </Modal>
    </>)
}