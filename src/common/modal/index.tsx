import React, {FC} from "react"
import {Modal} from "antd";
import useStore from "@/store/store";
const ModalX:FC = () => {
    const {modalVisiable,setModalVisiable,modalContent}=useStore()

    const defaultCancel = () => setModalVisiable(false)

    const onOk = ()=>{
        modalContent.onOk && modalContent.onOk()
        defaultCancel()
    }

    return modalContent? <Modal
        title={<div style={{color:'#000',fontWeight:550,marginBottom:20}}>{modalContent.title}</div>}
            visible={modalVisiable}
            onCancel={modalContent.onCancel || defaultCancel}
            onOk={onOk}
            okText={modalContent.okText || 'Save'}
            cancelText={modalContent.cancelText || 'Cancel'}
            zIndex={7000}
            width={modalContent.width || 600}
        >
            <div style={{display:"flex",alignItems:"center",paddingLeft:10}}>
                {modalContent.content}
            </div>
        </Modal>:<></>
}

export default ModalX;
