import { useContext } from 'react';
import { Dialog, Typography, List, ListItem, Box, styled } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../constants/data';

const Component = styled(Box)`
display: flex;
flex-direction: column;
align-items: center;
 

@media (min-width: 640px) {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
`;

const Container = styled(Box)`
  padding: 5rem;
  max-width: 70%;
 
  @media (min-width: 600px) {
    padding: 4rem;
  }
`;

const QRCOde = styled('img')({
  margin: '1rem 0 0 1rem',
  height: 'auto',
  maxWidth: '100%',
});

const Title = styled(Typography)`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  color: #525252;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif;
  font-weight: 300;
  @media (min-width: 600px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 0.9375rem;
    font-size: 1rem;
    line-height: 1.75rem;
    color: #4a4a4a;
  
    @media (min-width: 600px) {
      font-size: 1.125rem;
      line-height: 2rem;
    }
  }
`;

const dialogStyle = {
  marginTop: '12%',
  height: '95%',
  width: '90%', // Adjusted width for small screens
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'auto',

};

const LoginDialog = () => {
  const { setAccount, showloginButton, setShowloginButton, setShowlogoutButton } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    let decoded = jwtDecode(res.credential);
    setAccount(decoded);
    setShowloginButton(false);
    setShowlogoutButton(true);
    await addUser(decoded);
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  return (
    <Dialog
      open={true}
      maxWidth={'md'}
      PaperProps={{ sx: dialogStyle }}
    >
      <Component>
      {/* <div className='flex flex-col m-4 p-4 justify-center items-center  '> */}
      <div className='flex flex-col m-4 p-4 justify-center items-center sm:hidden '>
          <Title>To use WhatsApp on your computer:</Title>
          <StyledList>
          <div className='hidden sm:block'>
            <ListItem>Upon tapping the Google icon, the system seamlessly integrates with 
            your Google account,
             retrieving your details to facilitate a smooth entry into the WhatsApp ecosystem.</ListItem>
             <ListItem>In the alpha version, the QR functionality is not operational; it serves merely as a demonstration icon. Instead, users can leverage the Google icon to effortlessly access their account details,
              providing a simplified and intuitive entry into the WhatsApp prototype.</ListItem>
              </div>
              <div className='flex flex-grow flex-col sm:hidden'>
            <ListItem>Google icon streamlines account integration.</ListItem>
             <ListItem>In the alpha version, the QR functionality is not operational.</ListItem>
              </div>
          </StyledList>
        </div>
     
        <Container className='hidden sm:block'>
          <Title>To use WhatsApp on your computer:</Title>
          <StyledList>
          <div className='hidden sm:block'>
            <ListItem>Upon tapping the Google icon, the system seamlessly integrates with 
            your Google account,
             retrieving your details to facilitate a smooth entry into the WhatsApp ecosystem.</ListItem>
             <ListItem>In the alpha version, the QR functionality is not operational; it serves merely as a demonstration icon. Instead, users can leverage the Google icon to effortlessly access their account details,
              providing a simplified and intuitive entry into the WhatsApp prototype.</ListItem>
              </div>
              <div className='flex flex-grow flex-col sm:hidden'>
            <ListItem>Google icon streamlines account integration.</ListItem>
             <ListItem>In the alpha version, the QR functionality is not operational.</ListItem>
              </div>
          </StyledList>
        </Container>
        
        <Box style={{ position: 'relative' }}>
          <QRCOde src={qrCodeImage} alt="QR Code" />
          <Box style={{ position: 'absolute', top: '50%',  transform: 'translateX(25%) translateY(-25%)' }}>
            {showloginButton ? <GoogleLogin buttonText="" onSuccess={onLoginSuccess} onError={onLoginFailure} /> : null}
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
