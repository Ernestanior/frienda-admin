export interface IResponse {
  code: number;
  data: any;
  msg: string;
}

export interface ILabelValue{
  label:string;
  value:string
}
export interface StoreState {
  modalVisiable:boolean;
  modalContent:any

}

export interface StoreActions {
  setModalVisiable:any;
  setModalContent:any;


}

export interface IAccountInfo {
  createDateTime: string;
  emailActive: number;
  id: number;
  initSubscribe: 0 | 1;
  isSubscribe: boolean;
  lastLoginDateTime: string;
  locale: 'en_US' | 'zh_CN' | 'zh_TW';
  openId: string;
  source: number;
  twoFactorAuth: 0 | 1;
  userName: string;
}
export interface ILogin {
  password: string;
  username: string;
  remember?: 0 | 1; //是否记住密码
  response?: string;
}

export interface FacebookLoginParams {
  token?: string;
  userId?: string;
}

export type VoidFunction = () => void;

export interface PaginationParams {
  pageSize: number;
  page: number;
}

export interface IGetSubscribeDetail {
  platform: 'android';
}
export type ISubscribeOption = IGetSubscribeDetail & {
  stripeId: string | undefined;
};

export interface ICurrentSubscription {
  id: number;
  status: string;
  stripeId: string;
  expirationDateTime: string;
  createDateTime: string;
  availableToken: number;
  type: string;
  frequency: number;
  token: number;
  isCancel: boolean;
}

export interface IUser {
  createDateTime: string;
  emailActive: number;
  id: number;
  initSubscribe: number;
  isSubscribe: boolean;
  lastLoginDateTime: string;
  locale: string;
  openId: string;
  source: number;
  twoFactorAuth: number;
  userName: string;
}
