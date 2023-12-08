import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

function DrawerMenu({ menuItems, drawerOpen, handleChangeItem, toggleDrawer }) {
  const drawerContent = (
    <div>
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding onClick={() => handleChangeItem(item)}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }} aria-label="mailbox folders">
      <Drawer open={drawerOpen} sx={{ display: 'block', '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default DrawerMenu;
