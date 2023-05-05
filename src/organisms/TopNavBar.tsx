import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import React from "react";

export const TopNavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MapRoundedIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              pb: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "Darumadrop One",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            めいだいトイレマップ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <MapRoundedIcon
            fontSize="large"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              pb: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Darumadrop One",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            めいだいトイレマップ
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
