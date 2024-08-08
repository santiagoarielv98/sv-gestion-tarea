import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@ant-design/icons/MenuOutlined";

import AppBar from "./AppBar";

interface NavbarProps {
  open: boolean;
  onToggle: () => void;
}

function Navbar({ open, onToggle }: NavbarProps) {
  return (
    <AppBar position="fixed" open={open} color="transparent">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onToggle}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
