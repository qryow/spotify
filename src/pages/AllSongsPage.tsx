import React, { useState, useEffect } from 'react'
import Navbar from '../components/HomePage/Navbar/Navbar'
import MainComponent from '../components/HomePage/Main/MainComponent'
import SideBar from '../components/HomePage/SideBar/SideBar'
import Player from '../components/HomePage/Player/Player'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../store/store'
import { getOneUser, getUsers } from '../store/Slices/AuthSlice'
import PlaylistDetails from '../components/HomePage/Playlist/PlaylistDetails'
import { useLocation } from 'react-router-dom'
import AllSongs from '../components/HomePage/Playlist/AllSongs'


const AllSongsPage = () => {
  const location = useLocation()
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

  const dispatch = useDispatch()

  const [active, setActive] = useState(false)
  console.log(active)
  
  const { activeAcc } = useSelector((state: RootState) => state.account);
  console.log(activeAcc);

  useEffect(() => {
    if (activeAcc) {
      localStorage.setItem('accountObj', JSON.stringify({username: activeAcc.username, isActive: activeAcc.isActive, id: activeAcc.id}))
    }
    if (activeAcc && activeAcc.isActive === true) {
      //dispatch(getOneUser({ id: activeAcc.id }) as any);
      return setActive(true);
    }
  }, [activeAcc])

  useEffect(() => {
    const accountObjString = localStorage.getItem('accountObj');
    if (accountObjString) {
      const parsedAccountObj = JSON.parse(accountObjString);
      dispatch(getOneUser({ id: parsedAccountObj.id }) as any);
    }
  }, []);

  return (
    <>
      {/*<div className={active ? 'wrapper' : 'wrapper'}>*/}
        <div className='container'>
          <Navbar />
          <AllSongs />
          <SideBar />
          <Player />
        </div>
      {/*</div>*/}
    </>
  )
}

export default AllSongsPage