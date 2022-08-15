import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, TextareaAutosize, Grid, Box, InputLabel, Button } from "@mui/material"
import { useState } from "react";
import { postUpdated, PostType } from "./PostSlice";


export function EditPost() {
  const { postId } = useParams();

  const post = useSelector((state:any) =>
    state.posts.entities.find((post:PostType) => post.id === Number(postId))
  );

  const dispatch = useDispatch();
  const history = useNavigate();

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [error, setError] = useState('');

  const handleTitle = (e:any) => setTitle(e.target.value);
  const handleBody = (e:any) => setBody(e.target.value);

  const handleClick = () => {
    console.log(title, body)
    if (title && body) {
      dispatch(
        postUpdated({
          id: Number(postId),
          title,
          body,
        })
      );

      setError('');
      history("/");
    } else {
      setError("Fill in all fields");
    }
  };

  return (    
    <div className="container">
      <div className="row">
        <h1>Edit post</h1>
      </div>
      <Grid container >
        <Box sx={{ display: 'flex', m: 1, p: 1, }} style={{ width: '100%' }}>          
          <TextField 
            label={"Title"}
            onChange={handleTitle}
            value={title}
            placeholder="Post Title"
            fullWidth
          />    
        </Box>
        <Box sx={{ display: 'flex' }} style={{ width: '100%' }}> 
          <InputLabel style={{width:'5%'}}>Body</InputLabel> 
          <TextareaAutosize 
            minRows={4}          
            aria-label={"Body"}
            placeholder={"Body"}
            onChange={handleBody}
            defaultValue={body}
            style ={{width: '95%'}}
          />                 
        </Box>
        <Box sx={{ display: 'flex', m: 1, p: 1, }} style={{ width: '100%' }}>
          {error && error}
        </Box>
        <Box>
          <Button 
            variant="contained"
            onClick={handleClick} 
            className="button-primary"             
          >Save Post </Button>
        </Box>      
      </Grid>
    </div>
  );
}