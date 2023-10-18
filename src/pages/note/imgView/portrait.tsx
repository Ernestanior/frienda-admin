import React, {FC, useEffect, useState} from "react";
import {Button, Image, notification, Badge} from "antd";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {image_url} from "@/store/request";
import {LeftOutlined} from "@ant-design/icons";
import ImageUpload from "@/pages/note/create/imageUpload";
import {RcFile} from "antd/lib/upload";
import {fileModify} from "@/store/network";

const ImgView: FC = () => {
    const navigate = useNavigate()
    const path:any = useLocation()
    // console.log(folderPath)
    const noteId:any = useParams().id
    const [imgList,setImgList] = useState<any>([])
    const [deleteList,setDeleteList] = useState<any>([])
    const [restList,setRestList] = useState<any>([])
    const [uploadList,setUploadList] = useState<any>([])
    const [modifyMode,setModifyMode] = useState<boolean>(false)
    useEffect(()=>{
        setRestList(path.state)
        setImgList(path.state)
    },[path.state])

    const onSubmit=async ()=>{
        const formData = new FormData()
        uploadList.forEach((img:any) => {
            formData.append('addFiles', img.originFileObj as RcFile);
        });
        deleteList.forEach((url:any) => {
            formData.append('deleteFiles', url);
        });
        formData.append('scriptId', noteId);

        await fileModify(formData)
        setModifyMode(false)
        navigate(-1)
    }
    const onDelete =(name:string,index:number)=>{
        if(restList.length+uploadList.length<=1){
            notification.error({message:"图片至少需要一张"})
            return
        }
        setRestList(restList.filter((v:any,i:number)=>i!==index))
        setDeleteList([...deleteList,name])
    }
    const onCancel = () =>{
        setModifyMode(false)
        setRestList(imgList)
    }

    const onBack = () =>{
        navigate(`/note/detail/${noteId}`)
    }

    return (
        <section>
            <div style={{color:"#ee8d20",fontWeight:600,cursor:"pointer"}} onClick={onBack}><LeftOutlined />返回</div>
            {modifyMode?<>
                <section style={{display:"flex",flexWrap:"wrap",marginTop:20,marginBottom:50}}>
                    {restList.map((res:any,index:number)=><div style={{width:200,marginRight:20,cursor:"pointer"}}>
                        <Badge count={<div onClick={()=>onDelete(res,index)} style={{backgroundColor:"red",padding:"3px",color:"#fff",borderRadius:"50%",fontWeight:800}}>一</div>}>
                            <Image style={{width:"100%"}} src={image_url+res}/>
                        </Badge>
                    </div>)}
                </section>
                <ImageUpload changePic={setUploadList}></ImageUpload>
                <Button style={{marginTop:20}} onClick={onSubmit}>确定</Button>
                <Button style={{marginTop:20,marginLeft:20}} onClick={onCancel}>返回</Button>
            </>:<>
                <section style={{display:"flex",flexWrap:"wrap",marginTop:20}}>
                    {imgList.map((res:any)=><div key={res} style={{width:200,marginRight:20,cursor:"pointer"}}>
                        <Image style={{width:"100%"}} src={image_url+res}
                               preview={{src: image_url+res}}/>
                    </div>)}
                </section>
                <Button style={{marginTop:20,marginRight:20}} onClick={()=>setModifyMode(true)}>修改</Button>
                {/*<Button style={{marginTop:20}} onClick={onDownload}>下载全部图片</Button>*/}
            </>}
        </section>
    );
};

export default ImgView;
