import { useDispatch, useSelector } from "react-redux";
import { TextField, TextareaAutosize, Grid, Box, InputLabel, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postAdded } from "./PostSlice";

export function AddPost() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState('');

  const handleTitle = (e:any) => setTitle(e.target.value);
  const handleBody = (e:any) => setBody(e.target.value);

  const postCount = useSelector((state:any) => state.posts.entities.length);

  const handleClick = () => {
    if (title && body) {
      dispatch(
        postAdded({
          id: postCount + 1,
          title,
          body
        })
      );

      setError('');
      history("/");
    } else {
      setError("Fill in all fields");
    }

    setTitle("");
    setBody("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add Post</h1>
      </div>
      <Grid container>
        <Box sx={{ display: 'flex', m: 1, p: 1, }} style={{ width: '100%' }}>
          <label htmlFor="nameInput">Title</label>
          <TextField                        
            label={"Title"}
            placeholder="Post Title"            
            onChange={handleTitle}
            value={title}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', m: 1, p: 1, }} style={{ width: '100%' }}>
          <InputLabel style={{width:'5%'}}>Body</InputLabel>
          <TextareaAutosize
            minRows={4}
            className="u-full-width" 
            onChange={handleBody}
            defaultValue={body}
            style ={{width: '95%'}}
          />          
        </Box>
        <Box sx={{ display: 'flex', m: 1, p: 1, }} style={{ width: '100%' }}>
          {error && error}
        </Box>
        <Box sx={{ display: 'flex', m: 1, p: 1, }} style={{ width: '100%' }}>          
          <Button 
            variant="contained"
            onClick={handleClick} 
            className="button-primary">
            Add Post
          </Button>
        </Box>
      </Grid>
    </div>
  );
}