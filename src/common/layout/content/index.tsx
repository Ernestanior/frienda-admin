import { Layout } from "antd";
import "./index.less";

const ContentP = ({children}:any) => {
    return <Layout.Content className="comp-layout-content" style={{minHeight:800}}>
        <section className="cdn-scroll" style={{paddingRight: 15}}>
            {children}
        </section>
    </Layout.Content>;
};

export default ContentP;
