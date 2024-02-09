import React, { useState, useRef } from 'react'
import style from "./playlist.module.scss"
import { addToPlaylist, setSelectedSong } from '../../../store/Slices/SongSlice';
import { useDispatch, useSelector } from 'react-redux';

import dots from '../../../img/icons/3dots.svg'
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../../helpers/hooks';

interface PlaylistSong {
  id: '',
  songName: '',
  songAlbum: '',
  songPoster: '',
  songUrl: ''
}
interface OneSongProps {
  music: PlaylistSong;
}
interface RootState {
  //account: AccountState;
  songs: SongsState;
  playlists: Playlists;
}
interface SongsState {
  myPlaylists: Playlists | [];
  onePlaylist: Playlists | undefined;
  songs: PlaylistSong | undefined;
  selectedSong: PlaylistSong | undefined;
}
interface PlaylistSong {
  id: '',
  songName: '',
  songAlbum: '',
  songPoster: '',
  songUrl: ''
}
interface Playlists {
  PlaylistName: string;
  PlaylistBg: string;
  PlaylistSongs: PlaylistSong[];
  author: string,
  id: string,
}

const OneSong: React.FC<OneSongProps> = ({ music }) => {
  const [songDrop, setSongDrop] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [playlistObj, setPlaylist] = useState({
    id: '',
    songName: '',
    songAlbum: '',
    songPoster: '',
    songUrl: ''
  })

  const navigate = useNavigate();

  const { myPlaylists } = useSelector((state: RootState) => state.songs);
  const { selectedSong } = useSelector((state: RootState) => state.songs);

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setSongDrop(false);
    setAddModal(false)
  });

  const dispatch = useDispatch();
  
  const handleMusicClick = () => {
    dispatch(setSelectedSong(music));
  };

  return (
    <>
      <div className={style.songs__item} onClick={handleMusicClick}>
        <div className={style.num__title}>
          <h2>#</h2>
        </div>
        <div className={style.name__title}>
          <img src={music.songPoster} alt="" />
          <h2> {music.songName} </h2>
        </div>
        <div className={style.album__title}>
          <h2> {music.songAlbum} </h2>
        </div>
        <div className={style.date__title}>
          <h2>Дата публикации</h2>
        </div>
        <div className={style.time__icon} onClick={() => setSongDrop(!songDrop)}>
          <img src={dots} alt="" />
        </div>
        <div ref={menuRef}>
          <div className={songDrop ? `${style.song__block} ${style.active__song}` : `${style.song__block}`}>
            <div className={style.sort__item} onClick={() => setAddModal(!addModal)} >
              <h5>Добавить в плейлист</h5>
            </div>
            <div className={style.sort__item} >
              <h5>Пока ничего</h5>
            </div>
            <div className={style.sort__item}>
              <h5>Пока ничего</h5>
            </div>
            <div className={style.sort__item}>
              <h5>Пока ничего</h5>
            </div>
          </div>
          <div className={addModal ? `${style.song__block} ${style.active__song} ${style.height}` : `${style.song__block}`}>
            {Array.isArray(myPlaylists) && myPlaylists.map((playlist: Playlists) => (
              <>
                <div className={style.sort__item} onClick={() => dispatch(addToPlaylist({playlistId: playlist.id, songObj: selectedSong}) as any)} key={playlist.id} >
                  <h5>{playlist.PlaylistName}</h5>
                </div>
              </>
            ))}
          </div> 
        </div>
      </div>
    </>
  )
};

export default OneSong