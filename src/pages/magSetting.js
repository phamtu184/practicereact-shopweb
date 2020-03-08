import React, {  useState } from 'react';
import ProductSetting from '../component/magSetting/productsSetting';
import UserSetting from '../component/magSetting/usersSetting';

import { makeStyles } from '@material-ui/core/styles';
import { Collapse, ListItemText, ListItemIcon, ListItem, List, Tab, Tabs, Box, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

export default function MagSetting(){
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
  return(
    <div className='row'>
      <div className='col-sm-2'>
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
        >
          <ListItem button onClick={handleClickOpenProduct}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {openProduct ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProduct} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  scrollButtons="auto"
                  orientation="vertical"
                >
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                </Tabs>
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleClickOpenUser}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {openUser ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openUser} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  scrollButtons="auto"
                  orientation="vertical"
                >
                  <Tab style={{display:'none'}} {...a11yProps(0)} />
                  <Tab style={{display:'none'}} {...a11yProps(1)} />
                  <Tab label="Item 3" {...a11yProps(2)} />
                  <Tab label="Item 4" {...a11yProps(3)} />
                </Tabs>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
      <div className='col-sm-10'>
        <TabPanel value={value} index={0}>
          <ProductSetting/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserSetting/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item 3
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item 4
        </TabPanel>
      </div>
    </div>
  )
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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}