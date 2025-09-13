import React from 'react';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Message as MessageIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';

const drawerWidth = 280;

const Sidebar = ({ currentView, setCurrentView, mobileOpen, handleDrawerToggle }) => {
  const menuItems = [
    { text: 'Дашборд', icon: <DashboardIcon />, view: 'dashboard' },
    { text: 'Пользователи', icon: <PeopleIcon />, view: 'users' },
    { text: 'Операции', icon: <SettingsIcon />, view: 'operations' },
    { text: 'Модерация', icon: <MessageIcon />, view: 'messages' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  const drawerContent = (
    <>
      <Toolbar sx={{ 
        backgroundColor: '#111111',
        borderBottom: '1px solid #333333',
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            color: '#ffffff',
          }}>
            G513 Admin
          </Typography>
          <Typography variant="caption" sx={{ color: '#888888' }}>
            Coworking Management
          </Typography>
        </Box>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' }, color: '#ffffff' }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={currentView === item.view}
              onClick={() => setCurrentView(item.view)}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  backgroundColor: '#333333',
                  color: '#ffffff',
                  border: '1px solid #444444',
                  '&:hover': {
                    backgroundColor: '#444444',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#ffffff',
                  },
                },
                '&:hover': {
                  backgroundColor: '#222222',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ color: currentView === item.view ? '#ffffff' : '#888888' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: currentView === item.view ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <Divider sx={{ borderColor: '#333333' }} />
      
      <List sx={{ px: 1, pb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: '#888888',
              '&:hover': {
                backgroundColor: '#222222',
                color: '#ff4444',
                transform: 'translateX(4px)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#000000',
            borderRight: '1px solid #333333',
            color: '#ffffff',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            borderRight: '1px solid #333333',
            color: '#ffffff',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;