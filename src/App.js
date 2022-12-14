import Header from "./Components/Header"
import Footer from "./Components/Footer"
import FrameOrderPage from "./Pages/FrameOrderPage";
import "./styles.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { Routes, Route } from "react-router-dom";
import courses from "./master.json"
import NotFound from "./Pages/NotFound";
import FrameArtPage from "./Pages/FrameArtPage";
import HomePage from "./Pages/HomePage";
import MultiArtPage from "./Pages/MultiArtPage"
import usePageTracking from "./usePageTracking"
import { Fragment } from "react";
import FiddlersElbowPage from "./Pages/FiddlersElbowPage"
import SampleOrderPage from "./Pages/SampleOrderPage.jsx";

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
      <LocalizationProvider dateAdapter={AdapterMoment}>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            {courses.map((course, index) => 
              <Fragment key={index}>
                <Route path={course.slug + "/preview"} element={<SampleOrderPage course={course}/>} />
                <Route path={course.slug + "/order"} element={<FrameOrderPage course={course}/>} />
                <Route path={course.slug} element={<FrameArtPage course={course}/>} />
              </Fragment>
            )}
            <Route path="/fiddlers" element={<FiddlersElbowPage />}/>
            <Route path="/multi" element={<MultiArtPage />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <Footer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
