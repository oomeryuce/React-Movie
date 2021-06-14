import {Home, Detail} from 'pages';

const routes = [
  {
    name: "Home",
    path: '/',
    exact: true,
    component: Home
  },
  {
    name: "Detail",
    path: '/detail/:id',
    exact: true,
    component: Detail
  }
];

export default routes;
