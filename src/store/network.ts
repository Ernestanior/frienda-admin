import request from './request';
import {ISearchPage} from "@/common/interface";

export function userList(searchPage:ISearchPage,signal:any) {
  return request({
    method: 'post',
    url: '/user/page',
    data:{searchPage}
  },signal);
}
export function scriptList(data:any,signal?:any) {
  return request({
    method: 'post',
    url: '/script/page',
    data
  },signal);
}
export function scriptCreate(data:any) {
  return request({
    method: 'put',
    url: '/script/create',
    data
  });
}
export function scriptDetail(id:any,signal:any) {
  return request({
    method: 'get',
    url: '/script/find-by-id',
    params:{id}
  },signal);
}
export function scriptDelete(id:number) {
  return request({
    method: 'delete',
    url: '/script/delete',
    data:[id]
  });
}
export function scriptModify(data:any) {
  return request({
    method: 'put',
    url: '/script/modify',
    data
  });
}
export function fileList(folderPath:any) {
  return request({
    method: 'get',
    url: '/file/list',
    params:{folderPath}
  });
}
export function fileModify(data:any) {
  return request({
    method: 'post',
    url: '/file/modify',
    data
  });
}
export function fileUpload(data:any) {
  return request({
    method: 'put',
    url: '/file/upload',
    data
  });
}
