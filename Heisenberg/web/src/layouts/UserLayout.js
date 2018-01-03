import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch, Redirect } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import { getRouteData } from '../utils/utils';


// const links = [{
//   title: '帮助',
//   href: '',
// }, {
//   title: '隐私',
//   href: '',
// }, {
//   title: '条款',
//   href: '',
// }];

const copyright = <div>Copyright <Icon type="copyright" /> 2017 瞳门科技</div>;

class UserLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  }
  getChildContext() {
    const { location } = this.props;
    return { location };
  }
  getPageTitle() {
    const { location } = this.props;
    const { pathname } = location;
    let title = '瞳门科技';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - 瞳门科技`;
      }
    });
    return title;
  }
  render() {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="" className={styles.logo} src="http://fujian.ufile.ucloud.com.cn/logo.png" />
                <span className={styles.title}>瞳门科技</span>
              </Link>
            </div>
            <p className={styles.desc}></p>
          </div>
          {
            getRouteData('UserLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
          
          <GlobalFooter className={styles.footer} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
