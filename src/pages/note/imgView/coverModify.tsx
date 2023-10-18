import React, {FC, useEffect, useState} from "react";
import {Button, Image,} from "antd";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {image_url} from "@/store/request";
import {LeftOutlined} from "@ant-design/icons";
import ImageUpload from "@/pages/note/create/imageUpload";
import {RcFile} from "antd/lib/upload";
import {fileUpload, scriptModify} from "@/store/network";

const ImgView: FC = () => {
    const navigate = useNavigate()
    const path:any = useLocation()
    // console.log(folderPath)
    const noteId:any = useParams().id
    const [originCover,setOriginCover] = useState<any>([])
    const [imgList,setImgList] = useState<any>([])
    useEffect(()=>{
        setOriginCover(path.state)
    },[path.state])

    const onSubmit=async ()=>{
        const formData = new FormData()
        formData.append('files', imgList[0].originFileObj as RcFile);
        const cover = await fileUpload(formData);
        formData.append('scriptId', noteId);
        await scriptModify({id:noteId,cover})
        navigate(-1)
    }

    const onBack = () =>{
        navigate(`/note/detail/${noteId}`)
    }
    return (
        <section>
            <div style={{color:"#ee8d20",fontWeight:600,cursor:"pointer"}} onClick={onBack}><LeftOutlined />返回</div>
            <section style={{display:"flex",flexWrap:"wrap",margin:"20px 0"}}>
                <span style={{fontWeight:"550",fontSize:16}}>原封面：</span>
                <div key={originCover} style={{width:200,marginRight:20,cursor:"pointer"}}>
                    <Image style={{width:"100%"}} src={image_url+originCover}
                           preview={{src: image_url+originCover}}/>
                </div>
            </section>
            <span style={{fontWeight:"550",fontSize:16,marginBottom:20}}>新封面：</span>
            <ImageUpload changePic={setImgList}></ImageUpload>
            <Button style={{marginTop:20}} onClick={onSubmit}>确定</Button>
        </section>
    );
};

export default ImgView;
