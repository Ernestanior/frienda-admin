import {Form, Input, Button} from "antd";
import React, { FC } from "react";
import "./form.less";

const LoginForm: FC = () => {
    const [form] = Form.useForm();
    return (
        <section className={"page-login-form"}>
            <Form autoComplete="off" layout="vertical" form={form} className="comp-form-lg">
                <div className='login-title'>Login</div>
                <Form.Item name="name" label={<span className="login-label">Username</span>}>
                    <Input style={{height:40}} />
                </Form.Item>
                <Form.Item name="password" label={<span className="login-label">Password</span>}>
                    <Input.Password/>
                </Form.Item>

                <div className="submit">
                    <Button
                        type="primary"
                        size="large"
                        style={{ width: "100%",fontWeight:550}}
                    >
                        Login
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default LoginForm;
