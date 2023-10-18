import React, {FC, useEffect, useState} from "react";
import {Button, Spin} from "antd";
import {RightOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {useLoaderData, useNavigate} from "react-router-dom";
import {image_url} from "@/store/request";
import {scriptList} from "@/store/network";

export const typeList:any[] = [{value:'惊悚',label:'惊悚'},{value:'剧情',label:'剧情'},{value:'悬疑',label:'悬疑'},
    {value:'情感',label:'情感'},{value:'阵营',label:'阵营'},{value:'机制',label:'机制'},
    {value:'家国',label:'家国'},{value:'恐怖',label:'恐怖'},{value:'青春',label:'青春'}]

const NoteList: FC = () => {
    const navigate = useNavigate()
    const data:any = useLoaderData()
    const [type,setType] = useState<string>('')
    const [displayData,setDisplayData]=useState<any>()

    useEffect(()=>{
        setDisplayData(data)
    },[data])
    const onSearch= async (e:any)=>{
        const res = await scriptList({
            keyWord:e,
            searchPage:{desc:0,page:1,pageSize:999,sort:""}
        })
        setDisplayData(res)
    }

    const onTypeSearch= async (e:any)=>{
        setType(e)
        const res = await scriptList({
            type:[e],
            searchPage:{desc:0,page:1,pageSize:999,sort:""}
        })
        setDisplayData(res)
    }


    return (
        <section>
            <section style={{marginBottom:10}}>
                {typeList.map((item)=><>
                    <Button type={type===item.value?'primary':'default'} style={{borderRadius:20,marginRight:5}} onClick={()=>onTypeSearch(item.value)}>{item.label}</Button>
                </>)}
            </section>
            <section>
                <Search onSearch={onSearch} style={{width:300,marginBottom:30,marginRight:30}} enterButton />
                <Button type={"primary"} onClick={()=>navigate('/note/create')}>新增</Button>
            </section>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {displayData? displayData.content.map((item:any,index:number)=><div key={index} style={{backgroundColor:"#fff",width:500,display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd",overflow:"hidden"}}>
                        <img alt="" style={{height:150}} src={image_url+item.cover}/>
                        <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between"}}>
                            <div>
                                <h3>{item.name}</h3>
                                <div style={{marginBottom:5}}>type：{item.type || ''}</div>
                            </div>
                            <div style={{cursor:"pointer",display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}} onClick={()=>navigate(`/note/detail/${item.id}`)}>详情<RightOutlined /></div>
                        </div>
                    </div>
                ):<Spin size={"large"}/>}
            </div>
        </section>
    );
};

export default NoteList;
