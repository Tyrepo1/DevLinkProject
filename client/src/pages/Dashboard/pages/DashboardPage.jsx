import React, { useState } from 'react';
import { Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Analytics from '../../Analytics/pages/Analytics';
import CreateProfile from '../../CreateProfile/pages/CreateProfile';
import DevListPage from '../../DevList/pages/DevListPage';
import DrawerMenu from '../components/DrawerMenu';
import TopNav from '../components/TopNav';

const menuItems = [
  { key: 'dashboard', icon: <DashboardIcon />, text: 'Dashboard', content: <Analytics /> },
  { key: 'findDev', icon: <PersonSearchIcon />, text: 'Find developer', content: <DevListPage /> },
  { key: 'createProfile', icon: <AccountBoxIcon />, text: 'My profile', content: <CreateProfile /> },
  // { key: 'chat', icon: <ChatBubbleIcon />, text: 'Chat', content: <Chat /> },
  // { key: 'profile', text: 'Profile', content: <Profile /> },
];

function DashboardPage() {
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleChangeItem = (item) => {
    setSelectedItem(item.key);
    toggleDrawer();
  };

  const renderContent = () => {
    const selectedContent = menuItems.find((item) => item.key === selectedItem)?.content;
    return selectedContent || <div>Page not found</div>;
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <DrawerMenu menuItems={menuItems} drawerOpen={drawerOpen} handleChangeItem={handleChangeItem} toggleDrawer={toggleDrawer} />
      <TopNav toggleDrawer={toggleDrawer} />
      <div className=' px-10 py-20'>
        {renderContent()}
      </div>
    </div>
  );
}

export default DashboardPage;
