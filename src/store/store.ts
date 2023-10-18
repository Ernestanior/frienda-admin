import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {StoreState, StoreActions} from './interface';

const initState: StoreState = {
    modalVisiable:false,
    modalContent:'',

};

const useStore = create<StoreState & StoreActions>()(
  devtools(
      immer((set) => ({
        ...initState,
          setModalVisiable:(modalVisiable:boolean)=>set(()=>({modalVisiable})),
          setModalContent:(modalContent:any)=>set(()=>({modalContent})),
      })),
      {
        name: 'global-store',
      },
  ),
);
export default useStore;
