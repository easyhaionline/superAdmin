import * as React from 'react';
import { useState } from 'react';
import './style.scss';
import { IoIosMenu } from 'react-icons/io';
import {
  BsChevronDown,
  BsFillBarChartFill,
  BsCardChecklist,
} from 'react-icons/bs';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BiSolidDashboard } from 'react-icons/bi';

import { useEffect } from 'react';
import { getAuth, removeAuth } from './commonUri';

const MenuItems = ({ routes }) => {
  const [openMenu, setIsOpenMenu] = useState(null);
  return (
    <div className="admin-dashboard-native-ui">
      <div className="">
        <Link to="/">
          <img
            src={'https://www.easyhaionline.com/assets/images/logo.svg'}
            class="img-fluid icon p-4 "
            alt="..."
          />
        </Link>
        <li class="lll">Admin Super_Admin Dashboard</li>
        <ul style={{ paddingLeft: 0 }} className="">
          {routes.map((item) => {
            const IconTemp = item.Icon;
            return (
              <div>
                <li
                  onClick={() => {
                    if (item.id === openMenu) {
                      setIsOpenMenu(null);
                    } else {
                      setIsOpenMenu(item.id);
                    }
                  }}
                  style={{ flex: 1, display: 'flex', alignItems: 'center' }}
                  className=""
                >
                  <Link
                    style={{ flex: 1 }}
                    class="dropdown-item"
                    to={`${item.link}`}
                  >
                    <IconTemp className="dropdown-item-icon" />
                    {item.name}
                  </Link>
                  {item?.children && (
                    <BsChevronDown
                      style={{
                        margin: '10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        background: 'transparent',
                      }}
                    />
                  )}
                </li>
                {item?.children && (
                  <div>
                    <div
                      style={{
                        ...(openMenu === item.id
                          ? {
                              transition: '0.5s ease',
                              backgroundColor: ' #0a405c',
                              padding: '10px 17px',
                              color: 'white',
                              borderbottem: '1px solid red',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 8,
                            }
                          : { height: 0, display: 'none' }),
                      }}
                    >
                      {item?.children?.map((_) => (
                        <Link
                          to={_.link}
                          style={{
                            padding: 0,
                            margin: 0,
                            fontWeight: '300',
                            fontSize: 15,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: '#fff',
                          }}
                        >
                          {_?.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
const studentNavLinks = [
  {
    id: 1,
    name: 'Dashboard',
    link: '/superadmin/supdash',
    Icon: ({ className }) => <BsCardChecklist className={className} />,
  },
  {
    id: 2,
    name: 'Daily Doubts',
    link: 'dailydoubt',
    Icon: ({ className }) => <BsFillBarChartFill className={className} />,
    children: [
      {
        id: 1,
        name: 'Daily Doubt limits',
        link: 'dailydoubt',
        Icon: ({ className }) => <BsFillBarChartFill className={className} />,
      },
      {
        id: 2,
        name: 'Create Plan',
        link: 'createplan',
        Icon: ({ className }) => <BsFillBarChartFill className={className} />,
      },

      {
        id: 3,
        name: 'Available Plan',
        link: 'availableplan',
        Icon: ({ className }) => <BsFillBarChartFill className={className} />,
      },
    ],
  },

  {
    id: 3,
    name: 'LoggedIn Students',
    link: 'student-list  ',
    Icon: ({ className }) => <BiSolidDashboard className={className} />,
  },
];

export default function TemporaryDrawer({}) {
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');
  const navigate = useNavigate();
  const toggleDrawer = (event) => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const admin_auth = getAuth();
    if (!admin_auth) {
      return navigate('/');
    }
  }, []);

  return (
    <div>
      <Drawer anchor={'left'} open={isOpen} onClose={toggleDrawer}>
        <MenuItems routes={studentNavLinks} />
      </Drawer>
      <div style={{ display: 'flex' }}>
        {matches && (
          <div style={{ flex: 3, minHeight: '100vh', maxWidth: 250 }}>
            <MenuItems routes={studentNavLinks} />
          </div>
        )}
        <div
          style={{
            flex: 12,
            minHeight: '100vh',
            height: '100vh',
            overflow: 'scroll',
            position: 'relative',
          }}
          className="second-navbar-heading"
        >
          <div className="sec-nav-logbtn">
            {!matches && (
              <div>
                <button onClick={toggleDrawer} className="btn">
                  <IoIosMenu fontSize={40} className="nav-icon" />
                </button>
              </div>
            )}
            <div className="header ml-auto ">
              <button
                onClick={() => {
                  removeAuth();
                  navigate('/');
                }}
                type="button"
                class="btn"
                style={{ color: '#fff' }}
              >
                Logout
              </button>
            </div>
          </div>
          <div style={{ padding: '0px 0px' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
