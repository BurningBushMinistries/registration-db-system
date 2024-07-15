import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Gyser from './pages/Gyser';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Home from './pages/Home';
import User from './pages/Test';
import ViewRecord from './pages/registration/ViewRecords';
import NotFound from './pages/Page404';
import Auth from './pages/Auth';
import Church from './pages/Church';
import StatsPage from './pages/StatsPage';
import ChurchRegister from './pages/ChurchRegister';
import EventRegister from './pages/calendar/AddEvent';
import StatsRegister from './pages/StatsRegister';
import AddUser from './pages/AddUser';
import AddMember from './pages/registration/AddUser';
import EventMenu from './pages/calendar/EventsMenu';
import DisplayEvent from './pages/calendar/DisplayEvent';
// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();
  
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: 'registration', element: <ViewRecord /> },
        { path: 'home', element: <AddMember /> },
        { path: 'event-menu', element: <EventMenu/>},
        { path: 'event-display', element: <DisplayEvent/>},
        { path: 'dashboard', element: <ViewRecord /> },
        { path: 'user', element: <User /> },
        { path: 'church', element: <Church /> },
        { path: 'stats', element: <StatsPage /> },
             { path: 'dashboard', element: <NotFound /> },
        // { path: 'user', element: <NotFound /> },
        // { path: 'church', element: <NotFound /> },
        // { path: 'stats', element: <NotFound /> },
        // { path: 'reports', element: <NotFound /> },
        { path: 'cells', element: <NotFound /> },
        // { path: 'calendar', element: <CalendarPage /> },
                { path: 'calendar', element: <DisplayEvent /> },
        // { path: 'cal' }
        { path: 'storage', element: <NotFound /> },
        { path: 'stats', element: <NotFound /> }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <AddMember /> },
        { path: 'registration', element: <AddMember /> },
        { path: '/app', element: <Navigate to="/dashboard" /> },
        { path: 'login', element: <Login /> },
        { path: 'gyser', element: <Gyser /> },
        { path: 'register', element: <Register /> },
        { path: 'add-user', element: <AddUser /> },
        { path: 'add-stats', element: <StatsRegister /> },
        { path: 'add-church', element: <ChurchRegister /> },
        { path: 'add-event', element: <EventRegister /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    
    { path: '*', element: <Navigate to="app/registration" replace /> },
    { path: '/', element: <Navigate to="app/registration" replace /> },
    { path: '/app/*', element: <Navigate to="app/registration" replace /> }
  ]);
}
