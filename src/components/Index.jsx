import React from 'react'
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
function Index() {
  return (
    <Box sx={{flexGrow:1}} >
        <AppBar position='sticky'>
       <Toolbar>
           <IconButton size='large' edge='start' sx={{mr:2}}>
                <MenuIcon/>
           </IconButton>
          
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Todo</Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Logout</Button>
       </Toolbar>
    </AppBar>
    </Box>
  )
}

export default Index;