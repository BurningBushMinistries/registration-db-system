// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Registration',
    path: '/app/home',
    icon: getIcon('eva:list-outline')
  },
  {
    title: 'Members',
    path: '/app/user',
    icon: getIcon('eva:people-fill')
  },
  // {
  //   title: 'church',
  //   path: '/app/church',
  //   icon: getIcon('eva:home-fill')
  // },
  {
    title: 'SeedOfInheritance',
    path: '/app/registration',
    icon: getIcon('eva:layers-outline')
  },
  // {
  //   title: 'calendar',
  //   path: '/app/calendar',
  //   icon: getIcon('eva:calendar-outline')
  // },
  // {
  //   title: 'storage',
  //   path: '/app/storage',
  //   icon: getIcon('eva:layers-outline')
  // },
  // {
  //   title: 'reports',
  //   path: '/app/reports',
  //   icon: getIcon('eva:attach-outline')
  // },
  // {
  //   title: 'cells',
  //   path: '/app/cells',
  //   icon: getIcon('eva:book-open-fill')
  // }
];

export default sidebarConfig;
