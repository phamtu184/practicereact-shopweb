import React, { useState } from "react";
import ProductSetting from "../component/magSetting/productsSetting";
import ProductsList from "../component/magSetting/productsList";
import UsersList from "../component/magSetting/usersList";
import Catalog from "../component/magSetting/catalog";

import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Tab,
  Tabs,
  Box,
  Typography,
} from "@material-ui/core";

import InboxIcon from "../image/jslogo/MoveToInbox";
import ExpandLess from "../image/jslogo/ExpandLess";
import ExpandMore from "../image/jslogo/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MagSetting() {
  const classes = useStyles();
  const [openProduct, setOpenProduct] = useState(true);
  const [openUser, setOpenUser] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpenProduct = () => {
    setOpenProduct(!openProduct);
    setOpenUser(!openUser);
  };
  const handleClickOpenUser = () => {
    setOpenUser(!openUser);
    setOpenProduct(!openProduct);
  };
  return (
    <div className="row">
      <div className="col-sm-2">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          <ListItem button onClick={handleClickOpenProduct}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Sản phẩm" />
            {openProduct ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProduct} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  scrollButtons="auto"
                  orientation="vertical"
                >
                  <Tab label="Nhập sản phẩm" {...a11yProps(0)} />
                  <Tab label="Danh sách sản phẩm" {...a11yProps(1)} />
                  <Tab label="Thêm catalog" {...a11yProps(2)} />
                </Tabs>
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleClickOpenUser}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Tài khoản" />
            {openUser ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openUser} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  scrollButtons="auto"
                  orientation="vertical"
                >
                  <Tab style={{ display: "none" }} {...a11yProps(0)} />
                  <Tab style={{ display: "none" }} {...a11yProps(1)} />
                  <Tab style={{ display: "none" }} {...a11yProps(2)} />
                  <Tab label="Danh sách tài khoản" {...a11yProps(3)} />
                  <Tab label="Item 4" {...a11yProps(4)} />
                </Tabs>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
      <div className="col-sm-10">
        <TabPanel value={value} index={0}>
          <ProductSetting />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductsList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Catalog />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UsersList />
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item 4
        </TabPanel>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
