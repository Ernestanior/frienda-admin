import React, {FC} from "react";
import Login from "@/pages/login";
import LayoutPlx from "@/common/layout";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Note from "@/pages/note";
import NoteDetail from "@/pages/note/detail";
import CreateNote from "@/pages/note/create";
import User from "@/pages/user";
import {scriptDetail, scriptList, userList} from "@/store/network";
import ImgView from "@/pages/note/imgView/portrait";
import CoverModify from "@/pages/note/imgView/coverModify";

/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ProjectRouter:FC = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutPlx><Outlet /></LayoutPlx>,
            children: [
                {
                    path: "note",
                    element: <Note/>,
                    // errorElement:<ErrorPage/>,
                    loader:async ({request})=>{
                        try {
                            return await scriptList({
                                searchPage:{desc:0,page:1,pageSize:999,sort:""}
                            },request.signal)
                        }
                        catch {
                            return null
                        }
                    }
                },
                {
                    path: "note/create",
                    element: <CreateNote/>,
                },
                {
                    path: "note/detail/:id",
                    element: <NoteDetail/>,
                    // errorElement:<ErrorPage/>,
                    loader:async ({params,request})=>{
                        try {
                            return await scriptDetail(params.id,request.signal)
                        }
                        catch {
                            return null
                        }
                    }
                },
                {
                    path: "note/portrait/:id",
                    element: <ImgView/>,
                    // errorElement:<ErrorPage/>,
                },
                {
                    path: "note/cover/:id",
                    element: <CoverModify/>,
                    // errorElement:<ErrorPage/>,
                },
                {
                    path: "user",
                    element: <User/>,
                    loader:async ({request})=>{
                        try {
                            return await userList({ desc:0,page:1,pageSize:999,sort:""},request.signal)
                        }
                        catch {
                            return null
                        }
                    }
                },
            ],
        },
        {
            path: "login",
            element: <Login/>,
        },
    ]);
    // return <BrowserRouter>
    //     <LayoutPlx>
    //         <Routes>
    //             <Route path="/" element={<Home/>}/> {/* 👈 Renders at /app/ */}
    //             <Route path="/note" element={<Note/>}/> {/* 👈 Renders at /app/ */}
    //             <Route path="/note/create" element={<CreateNote/>}/> {/* 👈 Renders at /app/ */}
    //             <Route path="/user" element={<Login/>}/> {/* 👈 Renders at /app/ */}
    //         </Routes>
    //     </LayoutPlx>
    // </BrowserRouter>

    return <RouterProvider router={router} />
}

export default ProjectRouter
