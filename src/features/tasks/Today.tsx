import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import DeleteOutlinedIcon from "@ant-design/icons/DeleteOutlined";
import EditOutlinedIcon from "@ant-design/icons/EditOutlined";

function TodayPage() {
  return (
    <div>
      <Typography variant="h3">Today</Typography>
      <List>
        {Array.from({ length: 10 }, (_, i) => i).map((value) => (
          <ListItem
            key={value}
            secondaryAction={
              <>
                <IconButton aria-label="edit">
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteOutlinedIcon />
                </IconButton>
              </>
            }
            disablePadding
          >
            <ListItemButton
              disableRipple
              role={undefined}
              // onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  // checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                /* id={labelId} */ primary={`Line item ${value + 1}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TodayPage;
