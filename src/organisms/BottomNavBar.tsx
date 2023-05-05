import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/posts":
        setValue(1);
        break;
      default:
        setValue(-1);
        break;
    }
  }, [location]);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction
          label="Map"
          icon={<MapIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          label="Posts"
          icon={<GridViewSharpIcon />}
          onClick={() => navigate("/posts")}
        />
      </BottomNavigation>
    </Paper>
  );
};
