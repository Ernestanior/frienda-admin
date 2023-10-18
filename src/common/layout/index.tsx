import { Layout } from "antd";
import ContentP from "./content";
import HeaderPlx from "./header";
import SideBar from "./sider"

const LayoutPlx = ({ children }:any) => {

    return <Layout className="height-fill">
        <HeaderPlx />
        <Layout>
            <SideBar/>
            <ContentP>{children}</ContentP>
        </Layout>
    </Layout>
}

export default LayoutPlx
