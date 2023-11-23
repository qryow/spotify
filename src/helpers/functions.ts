//export const addDataToLocalStorage = (username: string, isActive: boolean, id: string | number) => {
//  localStorage.setItem('account', JSON.stringify(username))
//  localStorage.setItem('isActive', JSON.stringify(isActive))
//  localStorage.setItem('id', JSON.stringify(id))

//}


import { useSelector } from "react-redux";
//import { RootState } from '../store/store'

interface AccountState {
  activeAcc: ActiveAccount | null;
}
interface ActiveAccount {
  isActive: boolean;
  id: string | number;
  username: string;
}
interface RootState {
  account: AccountState;
}

const { activeAcc } = useSelector((state: RootState) => state.account);


if(activeAcc) {
  localStorage.setItem('accountObj', JSON.stringify({username: activeAcc.username, isActive: activeAcc.isActive, id: activeAcc.id}))
}
