import React, { useContext, useState } from 'react'
import Logo from "../../assets/logo.svg";
import { Button, Tabs, Tab } from '@material-ui/core';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserContext from '../../helpers/context/user-context';
import { APILogoutUser } from '../../helpers/UserAPIs';
import './Header.css';

//LOGIN, REGISTER AND LOGO IS HERE

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor:"white",
  border: '0.3px solid gray',
  boxShadow: 24,
  borderRadius:"5px",
  p: 4,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
    {children}
    </div>
  );
}

const Header = (props) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const ctx = useContext(UserContext);


  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };


  const onLogoutClicked = () => {
    //PASS AUTH TOKEN TO LOG OUT USER
    const authToken = ctx.auth;
    if(authToken){
      APILogoutUser(authToken);
      //REMOVE TOKEN FROM SESSION STORAGE AND ALSO CONTEXT
      window.sessionStorage.removeItem("access-token");
      ctx.setAuth(null);
    }
  }

  return (
    <div className='main-header'>
      <div>
        <img src={Logo} alt="logo" className='main-logo' />
      </div>
      <div>
        {!ctx.auth ? <Button variant="contained" onClick={()=> setModalOpened(true)} style={{marginRight:"10px"}}>Login</Button> :""} 
        <Button variant="contained" style={{marginRight:"10px"}} color="primary">Book Show</Button>
        {ctx.auth ?<Button variant="contained" type='button' onClick={onLogoutClicked}>LogOut</Button> :""}
      </div>
      <Modal
          isOpen={modalOpened}
          className='auth-modal'
          onRequestClose={()=> setModalOpened(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
      <div style={style}>
        <Tabs value={activeTab} onChange={handleChange} style={{justifyContent:"center"}}>
          <Tab label="Log In"  {...a11yProps(0)} />
          <Tab label="Register"  {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
        <LoginForm closeModal={()=> setModalOpened(false)} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <RegisterForm closeModal={()=> setModalOpened(false)} />
      </TabPanel>
      </div>
      </Modal>
    </div>
  )
}

export default Header