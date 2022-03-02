import * as React from 'react';
import styled from '@emotion/styled';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, InputAdornment, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UploadImageBtn } from './img-upload-btn';

const LandigNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

const pagesMobile = ['Search', 'Sign In']

export function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <LandigNavbarRoot>
                <Container maxWidth="xl" justifyContent='space-between'>
                    <Toolbar disableGutters>
                        <Box
                            sx={{ flexGrow: 30, ml: 1, mr: 2, display: { xs: 'flex', md: 'flex' } }}
                        >
                            <Button
                                color='primary'
                                variant='text'
                            >
                                LOGO
                            </Button>

                        </Box>

                        <Box
                            sx={{
                                alignItems: 'center',
                                width: '30vw',
                                flexGrow: 20
                            }}
                        >

                            <TextField
                                id="input-with-icon-textfield"
                                label="Image URL"
                                size='small'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <UploadImageBtn />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                sx={{
                                    my: 1,
                                    alignItems: 'center',
                                    display: { xs: 'none', md: 'block' }                             
                                }}
                            />

                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Stack spacing={1} direction='row'>
                                <Button variant='contained' sx={{ width: '10vw' }}>Sign In</Button>
                            </Stack>
                        </Box>

                        {/* 모바일용 */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} justifyContent='space-between'>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="primary"
                                sx={{
                                    display: {
                                        xs: 'inline-flex',
                                        md: 'none'
                                    }
                                }}
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
                                {pagesMobile.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </LandigNavbarRoot>
        </>
    )
}
