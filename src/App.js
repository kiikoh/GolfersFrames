import Header from "./Components/Header"
import Footer from "./Components/Footer"
import FrameOrderPage from "./Pages/FrameOrderPage";
import "./styles.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import courses from "./master.json"
import NotFound from "./Pages/NotFound";
import FrameArtPage from "./Pages/FrameArtPage";
import HomePage from "./Pages/HomePage";
import usePageTracking from "./usePageTracking"

const theme = createTheme({
  palette: {
    primary: {
      main: '#1269af',
    },
    secondary: {
      main: '#ddd'
    }
  },
  typography: {
    fontFamily: [
      'Kalam',
      '-apple-system',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {

  usePageTracking();

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <BrowserRouter basename="/frames">
            <Header />
            <Routes>
              <Route exact path="/" element={<HomePage/>}/>
              {courses.map((course, index) => 
                <>
                  <Route key={index} path={course.slug + "/order"} element={<FrameOrderPage course={course}/>} />
                  <Route key={index} path={course.slug} element={<FrameArtPage course={course}/>} />
                </>
              )}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
