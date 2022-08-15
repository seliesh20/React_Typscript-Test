import { fetchPosts, postDeleted } from "./PostSlice";
import { useDispatch, useSelector } from "react-redux";
import {Button, Box, IconButton, Grid} from '@mui/material'
import {Edit, Delete} from '@mui/icons-material'
import { Link } from "react-router-dom";

export function PostList() {
  const dispatch = useDispatch<any>();

  const { entities } = useSelector((state:any) => state.posts);
  const loading = useSelector((state:any) => state.loading);

  const handleDelete = (id:any) => {    
    dispatch(postDeleted({ id }));    
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Redux CRUD POST APP</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <Button variant="contained" 
            onClick={() => dispatch(fetchPosts())}
            className="button-primary"
          >
            Load Posts
          </Button>
        </div>
        <div className="two columns">
          <Button variant="contained" href="/add-post">
           Add Post
          </Button >
        </div>
      </div>
      <div className="row">
        <Grid container spacing={2} justifyContent="space-between">
          {loading ? (
            "Loading..."
          ) : (
            <div>
              {entities.length &&
                entities.map((entry: any, i: any) => (
                  <Box key={i} role="listitem">
                    <h1>{entry.title}</h1>
                    <Link to={`/edit-post/${entry.id}`} role="editlink"><Edit /></Link>
                      <IconButton onClick={() => handleDelete(entry.id)} role="deletelink">
                        <Delete />
                      </IconButton>
                    <p>{entry.body}</p>
                  </Box>
                ))}
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
}