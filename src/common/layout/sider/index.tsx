import React, {FC, useMemo} from "react";
import {Layout, Menu} from 'antd';
import {Link, useLocation} from "react-router-dom"
import {IRoleLimitModule} from "@/common/interface";
import {XOR} from "ts-xor/dist";
import {BookOutlined, UserOutlined} from "@ant-design/icons";

const AntSide = Layout.Sider

const { SubMenu } = Menu;

interface IMenu extends IRoleLimitModule{
    icon?:any;
    url: string;
    text: string;
}

interface IMultipleMenu extends IRoleLimitModule{
    text: string;
    icon:any;
    childs: IMenu[]
}

const Side:FC = () => {
    const location = useLocation();
    const url = location.pathname;

    const menuList: Array<XOR<IMenu, IMultipleMenu>> = useMemo(()=>[
        {
            url: '/user',
            text: "用户",
            icon:<UserOutlined style={{fontSize:20}}/>,
        },
        {
            url: "/note",
            text: "剧本",
            icon:<BookOutlined style={{fontSize:20}}/>,
        },

    ],[])
    const selectKeys = useMemo(() => {
        const keys: string[] =[]
        menuList.forEach(menu => {
            if(menu.childs){
                menu.childs.forEach(subMenu => {
                    if(url.indexOf(subMenu.url) === 0){
                        keys.push(subMenu.url)
                    }
                })
                return;
            }
            if(url.indexOf(menu.url) === 0){
                keys.push(menu.url)
            }
        })
        return keys
    }, [url,menuList])

    return <AntSide width={150} style={{backgroundColor:"#fff"}}>
        <Menu selectedKeys={selectKeys} style={{fontWeight:550,marginTop:20}}>
            {
                menuList.map((menu:any) => {
                    if(menu.childs){
                        return <SubMenu key={menu.text} title={menu.text} icon={menu.icon}>
                            {
                                menu.childs.map((subMenu:any) => {
                                    return <Menu.Item key={subMenu.url} >
                                        <Link to={subMenu.url}>
                                            {subMenu.text}
                                        </Link>
                                    </Menu.Item>
                                })
                            }
                        </SubMenu>
                    }
                    if (menu.icon){
                        return <Menu.Item key={menu.url} icon={menu.icon}>
                            <Link to={menu.url}>
                                {menu.text}
                            </Link>
                        </Menu.Item>
                    }
                    return <Menu.Item key={menu.url}>
                        <Link to={menu.url}>
                            {menu.text}
                        </Link>
                    </Menu.Item>
                })
            }
            {/*<div style={{position:"absolute",bottom:20,left:20}}>{ process.env.REACT_APP_VERSION || ""}</div>*/}
        </Menu>

    </AntSide>
}

export default Side;
