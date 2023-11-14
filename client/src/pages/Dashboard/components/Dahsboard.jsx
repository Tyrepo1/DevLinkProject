import AccountCircle from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import logoNoBackground from '../../../images/devlink-logo/png/logo-no-background.png';
import Analytics from '../../Analytics/pages/Analytics';
import Chat from '../../Chat/pages/Chat';
import CreateProfile from '../../CreateProfile/pages/CreateProfile';
import DevListPage from '../../DevList/pages/DevListPage';
import { startNewChat } from '../../../api/Chat/ChatAPI';
import { getProfile } from '../../../api/CreateProfile/CreateProfileAPI';
import Popup from '../../../components/Popup'

const drawerWidth = 240;

function Dashboard(props) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState("dashboard");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [toUser, setToUser] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("")

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const username = localStorage.getItem("username")

  getProfile(username).then(
    (result) => {
      setProfile(result)
    }
  )

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    localStorage.removeItem("username");
    localStorage.setItem("loggedIn", false);
    navigate("/login");
  };

  const handleSubmit = () => {
    setMessage("Profile has been updated")
    setIsOpen(true)
    setSelectedItem("dashboard")
  }

  const handleAgentSelect = (agent) =>{
    setToUser(agent)
    setSelectedItem("chat")
  }

  const handleNameClicked = (dev) =>{
    startNewChat(dev).then(
      (result) => {
        if(result){
          setToUser(dev)
          setSelectedItem("chat")
        }
        else{
          alert("Something went wrong")
        }    
      }
    )
    
  }

  const menuItems = [
    { key: 'dashboard', icon: <PersonSearchIcon />, text: 'Dashboard', content: <Analytics handleAgentSelect = {handleAgentSelect}/> },
    { key: 'findDev', icon: <DashboardIcon />, text: 'Find developer', content: <DevListPage handleNameClicked = {handleNameClicked}/> },
    { key: 'createProfile', icon: <AddIcon />, text: 'Create profile', content: <CreateProfile profile={profile} handleSubmit={handleSubmit}/> },
    { key: 'chat', icon: <ChatBubbleIcon />, text: 'Chat', content: <Chat toUser={toUser}/> },
  ];
  

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (item) => {
    if (window.innerWidth < 600) { 
        setMobileOpen(!mobileOpen);
      }
    setSelectedItem(item.key);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding onClick={() => handleDrawerToggle(item)}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderContent = () => {
    const selectedContent = menuItems.find((item) => item.key === selectedItem)?.content;
    return selectedContent || <div>Page not found</div>;
  };
  
  const closePopup = () => {
    setIsOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
        <Popup isOpen={isOpen} severity={"success"} children={message} closePopup={closePopup} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logoNoBackground} className=' w-32 cursor-pointer mr-4'/>
          <div className=' ml-auto'>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}

export default Dashboard;