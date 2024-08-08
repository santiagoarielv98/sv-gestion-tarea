import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";

import MenuOutlinedIcon from "@ant-design/icons/MenuOutlined";

import { drawerWidth } from "@/constants/drawer";
import { menuItems } from "@/constants/nav";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onDrawerClose: () => void;
  onDrawerTransitionEnd: () => void;
  onDrawerToggle: () => void;
}

export default function Sidebar({
  open,
  onDrawerClose,
  onDrawerTransitionEnd,
  onDrawerToggle,
}: SidebarProps) {
  const { pathname } = useLocation();

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: "flex-end", width: "100%" }}>
        <IconButton edge="end" color="inherit" onClick={onDrawerToggle}>
          <MenuOutlinedIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={pathname === item.path}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={open}
        onTransitionEnd={onDrawerTransitionEnd}
        onClose={onDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="persistent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open={open}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
