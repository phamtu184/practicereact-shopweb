import React, { useEffect, useState } from 'react';
import ProductSetting from '../component/magSetting/productsSetting';
import UserSetting from '../component/magSetting/usersSetting';

import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box, Typography, Paper } from '@material-ui/core';

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  }
}));

export default function VerticalTabs() {
  const [value, setValue] = useState(0);
  const [media, setMedia] = useState('');
  useEffect(()=>{
    const handler = e => setMedia(e.matches);
    window.matchMedia("(max-width: 800px)").addListener(handler);
  },[])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <>
      {media && 
        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            className='container'
          >
            <Tab label="Sản phẩm" />
            <Tab label="Tài khoản" />
          </Tabs>
        </Paper>
      }
      <div className={classes.root}>
        {!media && 
          <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          indicatorColor="primary"
          textColor="primary"
          >
            <Tab label="Sản phẩm" {...a11yProps(0)} />
            <Tab label="Tài khoản" {...a11yProps(1)} />
          </Tabs>
        }
        <TabPanel value={value} index={0}>
          <ProductSetting/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserSetting/>
        </TabPanel>
      </div>
    </>
  );
}
// const [users, setUsers] = useState([]);
  // useEffect(()=>{
  //   axios.get('/users/userslist')
  //   .then(response => {
  //     setUsers(response.data);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  // }, [])
  // <div className='container'>
    //   <h2>Users</h2>
    //   {users.length > 0 &&
    //     <div className='row'>
    //       {users.map((user, index)=>(
    //         <div className='col-md-4' key={index}>
    //           <Card style={{ width: "300px", height:"400px"}} className="mt-4">
    //             <CardContent>
    //               <Typography>{user.fullname}</Typography>
    //               <Typography>{user.email}</Typography>
    //               <Typography>{user.phone}</Typography>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       ))}
    //   </div>
    //   }
    // </div>