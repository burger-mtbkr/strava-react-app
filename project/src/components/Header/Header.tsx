import { useState, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { TestIds } from 'src/test/utils/testId.util';
import { useSelector } from 'react-redux';
import { getHeaderTitle } from 'src/selectors';
import { Link } from 'react-router-dom';

const navDrawerId = 'app-navigation-menu';

const Header = () => {
  const title = useSelector(getHeaderTitle);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="header-bar"
        position="fixed"
        data-testid={TestIds.headerAppBarTestId}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open navigation menu"
            aria-controls={navDrawerId}
            aria-haspopup="true"
            aria-expanded={drawerOpen}
            onClick={openDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 8 }}>
            <Link to="/" className="title-link">
              {title}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        id={navDrawerId}
        anchor="left"
        open={drawerOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 300,
            pt: 0,
            bgcolor: 'background.default',
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: 6,
          },
        }}
      >
        <Box sx={{ pt: 2, pb: 1, px: 0 }}>
          <Typography
            variant="overline"
            sx={{ px: 2.5, color: 'text.secondary', fontWeight: 600, letterSpacing: 0.6 }}
            component="p"
          >
            Go to
          </Typography>
        </Box>
        <Divider />
        <Box
          component="nav"
          aria-label="App navigation"
          sx={{ listStyle: 'none' }}
        >
          <List
            component="ul"
            dense
            disablePadding
            sx={{ py: 1.5, px: 1, m: 0, listStyle: 'none' }}
          >
            <ListItem
              component="li"
              disablePadding
              sx={{ display: 'list-item' }}
            >
            <ListItemButton
              component={Link}
              to="/"
              onClick={closeDrawer}
              sx={{
                borderRadius: 2,
                py: 1.5,
                px: 1.5,
                alignItems: 'center',
                '&:hover, &:focus-visible': {
                  backgroundColor: 'action.hover',
                  '& .nav-item-icon': {
                    transform: 'scale(1.04)',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 48,
                  pl: 0,
                  pr: 0,
                  mr: 2.5,
                  flexShrink: 0,
                  justifyContent: 'center',
                }}
              >
                <Box
                  className="nav-item-icon"
                  aria-hidden
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    boxShadow: (theme) =>
                      `0 2px 8px ${theme.palette.mode === 'light' ? 'rgba(252, 82, 0, 0.32)' : 'rgba(0,0,0,0.2)'}`,
                    transition: (theme) =>
                      theme.transitions.create(['transform', 'box-shadow'], { duration: 200 }),
                  }}
                >
                  <ListAltIcon sx={{ fontSize: 24 }} />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary="Recent activities"
                secondary="Newest from your feed"
                primaryTypographyProps={{ variant: 'body1', fontWeight: 600, component: 'span' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
