import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import {useState} from "react"
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {Avatar, IconButton, ThemeProvider} from "@mui/material";
import fadedLogo from '../../images/FadedLogo.png';

const appBarTheme = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
    },
});

const pages = ["HOMEPAGE", "EARTHPAGE", "APOD", "MARS", "MARS WEATHER", "NATURAL EVENTS", "FIREBALL DATA", "GRAPH PAGE","ABOUT US"];

const Header = ({setPage}) =>
{
    const [anchorElNav, setAnchorElNav] = useState(null);



    const handleCloseNavMenu = (page) => {
        pages.map((pageList) => {
            if (pageList === page) {
                setPage(page);
            }
        })
        setAnchorElNav(null);
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }

    return (
        <ThemeProvider theme={appBarTheme}>
            <AppBar position="static" color = "primary">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            SPACE VISION
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
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page}
                                              onClick={()=> {handleCloseNavMenu(page)}}
                                    >
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Avatar alt="Space Vision logo" src={fadedLogo}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                              SPACE VISION
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={()=> {handleCloseNavMenu(page)}}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );

}

export default Header;
