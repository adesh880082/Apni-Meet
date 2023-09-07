import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui'
import React, { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { useAppDispatch, useAppSelector } from './app/hooks';
import ThemeSelector from './components/Themes/ThemeSelector';
import CreateMeeting from './Pages/CreateMeeting';
import OneOnOneMeeting from './Pages/OneOnOneMeeting';
import { setToasts } from './app/slices/MeetingSlice';
import VideoConference from './Pages/VideoConference';
import MyMeetings from './Pages/MyMeetings';
import Meeting from './Pages/Meeting';
import JoinMeeting from './Pages/JoinMeeting';

function App() {
const dispatch = useAppDispatch();
const toasts = useAppSelector( (zoom) => zoom.meetings.toasts );
const isDarkTheme = useAppSelector((zoom)=> zoom.auth.isDarkTheme);
const [theme, setTheme] = useState<EuiThemeColorMode>("light");
const [isInitialTheme, setisInitialTheme] = useState(true)
useEffect(() => {
  const theme = localStorage.getItem("zoom-theme");
  if(theme){
    setTheme(theme as EuiThemeColorMode)
  } else{
    localStorage.setItem("zoom-theme", "light")
  }
},[])

useEffect(() => {
  if(isInitialTheme) setisInitialTheme(false);
  else{
    window.location.reload();
  }
},[isDarkTheme]);

  const overrides = {
    colors:{
      LIGHT:{primary:"#0b5cff"},
      DARK:{primary:"#0b5cff"},
    }
  }

  const removeToast = (removeToast:{ id: string }) => {
    dispatch(
      setToasts(
        toasts.filter(( toasts: { id : string }) => toasts.id !== removeToast.id)
      )
    );
  }

  return (
    <ThemeSelector>

      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<CreateMeeting />} />
              <Route path="/create1on1" element={<OneOnOneMeeting />} />
              <Route path="/videoconference" element={<VideoConference />} />
              <Route path="/mymeetings" element={<MyMeetings />} />
              <Route path="/meetings" element={<Meeting />} />
              <Route path="/join/:id" element={<JoinMeeting />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<Dashboard />} />
              </Routes>
              <EuiGlobalToastList
              toasts={toasts}
              dismissToast={removeToast}
              toastLifeTimeMs={5000}
              />
        </EuiThemeProvider>
      </EuiProvider>

    </ThemeSelector>
  )
}

export default App