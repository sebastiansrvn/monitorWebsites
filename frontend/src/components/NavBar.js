import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";

const pages = ['Alerts', 'Status', 'SSL Certificates', 'Add'];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [submit, setSubmit] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const updatePage = (updatePage, page) => {
    handleCloseNavMenu()
    updatePage(page, null);
  }

  const updatePageAuth = (updatePage, page) => {
    updatePage(page, null)
    handleCloseUserMenu()
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getLoginRegister = () => {
    return (
      <div>
        <Link to="/login" className="text-decoration-none text-black">
          <MenuItem key="Login">
            <Typography textAlign="center">
              Login
            </Typography>
          </MenuItem>
        </Link>
        <Link to="/register" className="text-decoration-none text-black">
          <MenuItem key="Register">
            <Typography textAlign="center">
              Register
            </Typography>
          </MenuItem>
        </Link>
      </div>
    )
  }

  const getLogout = () => {
    return (
      <MenuItem key="Login" onClick={logOut}>
        <Typography textAlign="center">
          Logout
        </Typography>
      </MenuItem>
    );
  }

  const logOut = () => {
    props.logOut(true);
  }
  
  return (
    <AppBar position="static" style={{ backgroundColor:  '#0d1821'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Monitor
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => updatePage(props.updatePage, page)}>
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Monitor
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to="/" key={page} className="text-decoration-none">
                <Button
                  onClick={() => updatePage(props.updatePage, page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            { sessionStorage.getItem("logged") ? getLogout() : getLoginRegister() }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;