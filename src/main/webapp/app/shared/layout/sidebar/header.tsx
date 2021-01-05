import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import AppRoutes from 'app/routes';

// import { useHistory } from 'react-router-dom';

import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { Layout, Menu } from 'antd';
import MenuItem from '../menus/menu-item';
import { useHistory } from 'react-router-dom';
import { locales, languages } from 'app/config/translation';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const SideBar = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLocaleEnglish = () => {
    Storage.session.set('locale', 'en');
    props.onLocaleChange('en');
  };

  const handleLocaleSerbian = () => {
    Storage.session.set('locale', 'sr');
    props.onLocaleChange('sr');
  };

  const history = useHistory();

  const handleClickOwners = () => history.push('/owners');
  const handleClickStores = () => history.push('/stores');
  const handleClickMachines = () => history.push('/machines');
  const handleClickHome = () => history.push('/');
  const handleClickLogout = () => history.push('/logout');
  const handleClickLogin = () => history.push('/login');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        {props.isAuthenticated ? (
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={handleClickHome} style={{ marginTop: '100px' }}>
              Home
            </Menu.Item>
            {/* <SubMenu key="sub1" title="Entities"> */}
            {props.isAuthenticated && (
              <Menu.Item id="2" onClick={handleClickOwners}>
                <Translate contentKey="global.menu.entities.owners" />
              </Menu.Item>
            )}
            {props.isAuthenticated ? (
              <Menu.Item id="3" onClick={handleClickLogout} style={{ marginTop: '100px' }}>
                <div>
                  <p>Logout</p>
                </div>
              </Menu.Item>
            ) : (
              <div></div>
            )}

            {/* <Menu.Item key="3" onClick={handleClickStores}>
              <Translate contentKey="global.menu.entities.stores" />
            </Menu.Item>
            <Menu.Item key="4" onClick={handleClickMachines}>
              <Translate contentKey="global.menu.entities.machines" />
            </Menu.Item>
          </SubMenu> */}
            {/* <SubMenu key="sub3" title="Language">
            <Menu.Item key="5" onClick={handleLocaleSerbian}>
              Bosnian
            </Menu.Item>
            <Menu.Item key="6" onClick={handleLocaleEnglish} >English</Menu.Item>
          </SubMenu> */}
          </Menu>
        ) : (
          <Menu theme="dark" mode="inline">
            <Menu.Item id="4" onClick={handleClickLogin} style={{ marginTop: '100px' }}>
              <div>
                <p>Login</p>
              </div>
            </Menu.Item>
          </Menu>
        )}
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '50px 16px', padding: '10px 20px 5px 5px' }}>
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
