import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AddPost } from "./features/posts/AddPost";
import { EditPost } from "./features/posts/EditPost";
import { Provider } from "react-redux";
import { PostList } from "./features/posts/PostList";
import { AppBar, Toolbar, IconButton, Typography, Container  } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import store from './store'
export default function App() {
  return (
    <Provider store={store}>
      <Container sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Posts
            </Typography>
          </Toolbar>
        </AppBar>
        <Router>
          <div>
            <Routes>
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/edit-post/:postId" element={<EditPost />} />
              <Route path="/" element={<PostList />} />
            </Routes>
          </div>
        </Router>
      </Container>
    </Provider>
    
  );
}