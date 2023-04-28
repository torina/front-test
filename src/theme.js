import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      background: {
        // paper: '#283046',
        primary: '#FFFFFF',
        secondary: '#0B5394',
        dialog: '#909094',
        secondary3: 'rgba(26, 60, 149, 0.03)',
        secondary10: 'rgba(26, 60, 149, 1)'
      },
      text: {
        primary: '#464658',
        secondary: '#FFFFFF',
        error: '#E72E39',
        link: '#0B5394',
        gray :'#64647D'
      },
      border: {
        primary: '#E3E6EC',
        form: '#EE2448'
      },
      icon: {
        primary: '#E3E6EC',
        secondary: '#0B5394',
        gray: '64647D',
      },
      load: {
        circle: '#0B5394',
      },
    },
  });
export default theme