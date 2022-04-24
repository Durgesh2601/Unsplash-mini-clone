import "./Homepage.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button, Input } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import Modal from "@mui/material/Modal";
import { DropzoneArea } from "material-ui-dropzone";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState, useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 14,
};
export const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRes, setTotalres] = useState(6);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
  };
  useEffect(() => {
    getAllData();
    getPosts(page);
    if (url) {
      fetch("https://unsplashdk.herokuapp.com/", {
        method: "POST",
        body: JSON.stringify({
          pic: url,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((d) => d.json())
        .then((res) => {
          setPosts([...posts, res]);
        })
        .catch((err) => {
          console.log(err);
        });
      setUploading(false);
      setSuccess(true);
      getPosts(page);
      getAllData();
    }
  }, [url, page]);

  const getAllData = () => {
    fetch("https://unsplashdk.herokuapp.com/")
      .then((d) => d.json())
      .then((res) => {
        setTotalres(res.length);
      });
  };
  const postData = () => {
    setUploading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "unsplash-mini-clone");
    data.append("cloud_name", "Unsplash");
    fetch("https://api.cloudinary.com/v1_1/Unsplash/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((d) => {
        setUrl(d.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPosts = (page = 1) => {
    fetch(`https://unsplashdk.herokuapp.com/?page=${page}&size=10`)
      .then((d) => d.json())
      .then((res) => {
        setPosts(res);
      });
  };
  const handleFile = (e) => {
    setImage(e[0]);
  };
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const fetchMoreData = (page) => {
    setPage(page + 1);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <div style={{ marginLeft: "10%" }}>
              <img
                src={
                  "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/tbvbvipimh2camf5nb2q"
                }
                height="45px"
                alt=""
              />
            </div>
            <Typography variant="h5" component="div">
              Unsplash
            </Typography>
            <TextField
              label="Search by name"
              sx={{ ml: 10 }}
              style={{ width: "35%" }}
            />
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="success"
                align="right"
                onClick={handleOpen}
              >
                Add a photo
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={posts.length !== totalRes}
        loader={<h4 align="center">Loading...</h4>}
      >
        <div className="conatiner">
          <Box sx={{ width: 1300, minHeight: 829 }}>
            <Masonry columns={3} spacing={4}>
              {posts.map((e) => (
                <div key={e._id} className="postDiv">
                  <img
                    src={`${e.pic}?w=162&auto=format`}
                    srcSet={`${e.pic}?w=162&auto=format&dpr=2 2x`}
                    alt={e.label}
                    loading="lazy"
                    style={{
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      display: "block",
                      width: "100%",
                    }}
                  />
                </div>
              ))}
            </Masonry>
          </Box>
        </div>
      </InfiniteScroll>
      {!uploading && !success ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ borderRadius: "15px" }}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h3"
              align="center"
            >
              Upload your image
            </Typography>
            <Typography
              id="modal-modal-description"
              align="center"
              varaiant="subtitle2"
              mt={2}
            >
              File should be Jpeg, Png...
            </Typography>{" "}
            <br />
            <DropzoneArea
              onChange={handleFile}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            />
            <p style={{ textAlign: "center" }}>or</p>
            <Input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleChange}
            />
            <Button variant="contained" component="span" onClick={postData}>
              Upload
            </Button>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{ width: "18%", height: "3%", borderRadius: "15px" }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h3"
              ml={1}
              mt={-2}
            >
              Uploading
            </Typography>
            <LinearProgress sx={{ mt: 2 }} />
          </Box>
        </Modal>
      )}
      {success ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{ width: "18%", height: "30%", borderRadius: "15px" }}
          >
            <div align="center">
              <BsCheckCircle style={{ color: "#219653" }} size={30} />
            </div>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h3"
              align="center"
            >
              Uploaded Successfully!
            </Typography>
            <img
              src={url}
              alt=""
              height="100%"
              width="80%"
              className="uploadedImg"
            />
          </Box>
        </Modal>
      ) : null}
      {posts.length === totalRes ? (
        <h5 align="center" style={{ color: "red" }}>
          Oops! No more images available. Please upload some pictures!
        </h5>
      ) : null}
    </div>
  );
};
