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
      <Header />
      <LocalizationProvider dateAdapter={DateAdapter}>
        <BrowserRouter>
            <Routes>
              {courses.map((course, index) => 
                <Route key={index} path={course.slug} element={<FrameOrderPage course={course}/>} />
              )}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
      </LocalizationProvider>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
