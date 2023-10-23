import React, {FC, useEffect, useState} from "react";
import {DatePicker, Form, Input, InputNumber, Modal, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {typeList} from "@/pages/note";
import FormItem from "@/common/Form/formItem";
import TextArea from "antd/es/input/TextArea";
import {difficulty} from "@/pages/note/create";
import {scriptModify} from "@/store/network";
import moment from "moment";

interface IProps{
    visible:boolean;
    onClose:()=>void;
    onOk:()=>void;
    data:any;
}
const ModifyDesign:FC<IProps> = ({onOk,onClose,visible,data}) => {
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        form.resetFields()
        onClose()
    }
    const onFinish =async ()=>{
        const formData = form.getFieldsValue()
        setLoading(true)
        scriptModify({...formData,id:data.id})
        setLoading(false)
        onOk()
    }

    useEffect(()=>{
        data && form.setFieldsValue({...data,publishDate:moment(data.publishDate),type:data.type.split(',')})
    },[form,data,visible])
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#000",fontWeight:550,marginBottom:20}}>Edit</div>}
        visible={visible}
        onCancel={onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        width={600}
    >
        <Form form={form} className="email-new">
            <FormItem name="name" label='剧本名'>
                <Input />
            </FormItem>
            <FormItem name="type" label={'类型'}>
                <Select mode="multiple" options={typeList}/>
            </FormItem>
            <FormItem name="author" label={'作者'}>
                <Input />
            </FormItem>
            <FormItem name="description" label={'简介'}>
                <TextArea style={{height:150}}/>
            </FormItem>
            <FormItem name="difficultyDegree" label={'难易程度'} wrapperCol={{span:3}}>
                <Select options={difficulty} style={{width:200}} />
            </FormItem>
            <FormItem name="duration" label='剧本时长'>
                <InputNumber style={{width:"100%"}}/>
            </FormItem>
            <FormItem label='玩家人数'>
                <FormItem name="playerMan" label='男'>
                    <InputNumber style={{width:"20%"}}/>
                </FormItem>
                <FormItem name="playerWoman" label='女'>
                    <InputNumber style={{width:"20%"}}/>
                </FormItem>
            </FormItem>
            <FormItem name="publishDate" label='发布日期' wrapperCol={{span:3}}>
                <DatePicker style={{width:200}}/>
            </FormItem>
        </Form>
    </Modal>
}

export default ModifyDesign;
