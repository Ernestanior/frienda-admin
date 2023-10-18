import React, {FC, useState} from "react";
import {Button, Col, Row} from "antd";
import {image_url} from "@/store/request";
import ModifyDesign from "@/pages/note/detail/modify";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {scriptDelete} from "@/store/network";
import useStore from "@/store/store";


const Detail: FC = () => {
    const navigate = useNavigate()
    const {setModalContent,setModalVisiable}=useStore()
    const data:any=useLoaderData()
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const noteId = useParams().id


    const deleteDesign= async ()=>{
        const value = {
            title: "删除剧本",
            content: `确定删除剧本: ${data.name} ？`,
            onOk: async() => {
                if (noteId){
                   await scriptDelete(parseInt(noteId))
                    navigate("../note");
                }
            }
        }
        setModalContent(value)
        setModalVisiable(true)
    }
    const goCover=async()=>{
        navigate(`/note/cover/${noteId}`,{state:data.cover})
    }
    const goPortrait=async()=>{
        navigate(`/note/portrait/${noteId}`,{state:data.portrait})
    }
    return (
        <section>
            <div style={{marginBottom:20}}>
                <Button onClick={()=>setEditFlag(true)}>Edit</Button>
                <Button style={{marginLeft:20,color:"red"}} onClick={deleteDesign}>Delete Item</Button>
            </div>
            <section style={{display:"flex"}}>
                <img style={{cursor:"pointer"}} alt="" src={image_url+data?.cover} height={200} onClick={goCover}/>
                <div style={{flex:1,marginLeft:20}}>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>剧本名</Col>
                        <Col span={16} style={{fontWeight:550}}>{data?.name}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>类型</Col>
                        <Col span={16} >{data?.type}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>作者</Col>
                        <Col span={16}>{data?.author}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>玩家人数</Col>
                        <Col span={16}>{data?.playerNumber}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>创建时间</Col>
                        <Col span={16}>{data?.createDate}</Col>
                        {/*<Col span={16}><Select style={{width:300}} mode={"multiple"} defaultValue={["白色","棕色","粉色"]}></Select></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>难度</Col>
                        <Col span={16}>{data?.difficultyDegree}</Col>
                        {/*<Col span={16}><Select style={{width:300}} mode={"multiple"} defaultValue={["S","M","L"]}></Select></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>点赞数</Col>
                        <Col span={16}>{data?.favor || 0}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>收藏数</Col>
                        <Col span={16}>{data?.collect || 0}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>剧本时长</Col>
                        <Col span={16}>{data?.duration}</Col>
                        {/*<Col span={16}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/></div></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>发布时间</Col>
                        <Col span={16}>{data?.publishDate}</Col>
                        {/*<Col span={16}><Select style={{width:300}} mode={"multiple"} defaultValue={["白色","棕色","粉色"]}></Select></Col>*/}
                    </Row>
                </div>
                <div style={{flex:1,marginLeft:20}}>
                        <div style={{fontWeight:550,color:"#9d692c",marginBottom:10}}>简介</div>
                        <div style={{wordBreak:"break-all"}}>{data?.description}</div>
                        {/*<Col span={19}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                </div>
            </section>
            <section style={{marginTop:20}}>
                {data?.portrait.map((res:string)=>
                    <img style={{cursor:"pointer",marginRight:20}} alt="" src={image_url+res} height={200} onClick={goPortrait}/>
                )}
            </section>
            <ModifyDesign onOk={()=>{setEditFlag(false);navigate(0)}} onClose={()=>setEditFlag(false)} visible={editFlag} data={data}></ModifyDesign>

        </section>
    );
};

export default Detail;
