import React, {FC, useState} from "react";
import {Button, Col, DatePicker, Form, Input, InputNumber, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import ImageUpload from "@/pages/note/create/imageUpload";
import FormItem from "@/common/Form/formItem";
import TextArea from "antd/es/input/TextArea";
import {useNavigate} from "react-router-dom";
import {fileUpload, scriptCreate} from "@/store/network";
import {typeList} from "@/pages/note";
import moment from "moment";

export const difficulty=[{value:'新手',label:'新手'},{value:'进阶',label:'进阶'},{value:'高玩',label:'高玩'}]
const CreateNote: FC = () => {
    const [form] = useForm()
    const [imgList,setImgList] = useState<UploadFile[]>([])
    const [coverList,setCoverList] = useState<UploadFile[]>([])
    const navigate=useNavigate()

    const onReturn=()=> {
        form.resetFields()
        navigate("..", { relative: "path" });
    }
    const onFinish =async ()=>{
        const res =form.getFieldsValue()
        console.log(res)
        const itemForm:any = form.getFieldsValue()
        const portraitData = new FormData()
        imgList.forEach(img => {
            portraitData.append('files', img.originFileObj as RcFile);
        });
        const portrait = await fileUpload(portraitData);

        const coverData = new FormData()
        coverData.append('files', coverList[0].originFileObj as RcFile);
        const cover = await fileUpload(coverData);
        await scriptCreate( {...itemForm,publishDate:moment(itemForm.publishDate).format('YYYY-MM-DD'),portrait,cover});
        navigate('..',{ relative: "path" })
    }
    return (
        <section>
            <Form form={form} labelCol={{span:2}} labelAlign={"left"} onFinish={onFinish}>
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
            <section style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                <div style={{display:"flex",width:"100%"}}>
                    <Col span={2}>封面</Col>
                    <ImageUpload changePic={setCoverList} max={1}></ImageUpload>
                </div>
                <div style={{display:"flex",width:"100%"}}>
                    <Col span={2}>插画</Col>
                    <ImageUpload changePic={setImgList}></ImageUpload>
                </div>
            </section>
            <div>
                <Button type="primary" style={{marginRight:20}} onClick={onFinish}>确认</Button>
                <Button onClick={onReturn}>返回</Button>
            </div>
        </section>
    );
};

export default CreateNote;
