import UserLayout from '../layouts/UserLayout';
import Login from '../routes/User/Login';

const data = [
  {
    component: UserLayout,
    layout: 'UserLayout',
    children: [{
      name: '帐户',
      icon: 'user',
      path: 'user',
      children: [{
        name: '登录',
        path: 'login',
        component: Login,
      }]
    }]
  }]

export function getNavData() {
  return data;
}

export default data;
