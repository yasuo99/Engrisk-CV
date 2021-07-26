import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
    {
        name: 'Trang Chủ',
        to: '/',
        exact: true
    },
    {
        name: 'Thảo Luận',
        to: '/thaoluan',
        exact: true
    },
    {
        name: 'Cửa Hàng',
        to: '/cuahang',
        exact: true
    },
    {
        name: 'Từ Điển',
        to: '/tudien',
        exact: true
    },
    {
        name: 'Từ Vựng',
        to: '/tuvung',
        exact: true
    },
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                );
            }}
        />
    );
};

class Menu extends Component {
    render() {
        return (
            <div >
                {this.showMenus(menus)}
          </div>
        );
    }
    showMenus = (menus) => {
        var result = null;
        if(menus.length > 0){
            result = menus.map((menu, index) => {
                return (
                    <MenuLink 
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }
        return result;
    }

}

export default Menu;
