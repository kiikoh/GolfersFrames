import Header from "./Components/Header"
import Footer from "./Components/Footer"
import FramePreviewPage from "./Pages/FramePreviewPage";
import "./styles.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1269af',
    },
    secondary: {
      main: '#e7dcdc'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Header />
        <FramePreviewPage />
        <Footer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
