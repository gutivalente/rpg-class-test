import { Button, styled } from '@mui/material';

const CustomButton = styled(Button)({
  borderRadius: '50px',
  textTransform: 'none',
  backgroundColor: '#531',
  color: '#eca',
  '&:hover': {
    backgroundColor: '#642'
  }
});

export default CustomButton;
