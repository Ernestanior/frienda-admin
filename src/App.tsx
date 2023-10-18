import React from 'react';
import './App.css';
import Router from "@/router";
import {ConfigProvider} from "antd";
import ModalX from "@/common/modal";
import "@/styles/index.less"
function App() {
  return (
      <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: '#000',
                algorithm: true, // 启用算法
              },
            },
          }}
      >
          <Router />
          <ModalX/>
      </ConfigProvider>

  );
}

export default App;
