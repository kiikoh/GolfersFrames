import { AppBar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box
                        onClick={() => navigate("/")}
                        component="img"
                        height={75}
                        alt="logo"
                        src="https://golfersflyby.com/images/GFBlogo.png"
                    />
                    <Typography variant="h4" component="div" sx={{fontWeight: "bold"}}>
                        Commemorative Framed Photos
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
