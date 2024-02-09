import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { ACCOUNT_API, PLAYLISTS_API, SONGS_API } from "../../helpers/const";

interface Song {
  id: string | number;
  songName: string;
  songAlbum: string;
  songPoster: string;
  songUrl: string;
}
interface PostAction {
  id: string | number;
  songName: string;
  songAlbum: string;
  songPoster: string;
  songUrl: string;
}
interface PlaylistSong {
  id: '',
  songName: '',
  songAlbum: '',
  songPoster: '',
  songUrl: ''
}
interface PlaylistAction {
    PlaylistName: string;
    PlaylistBg: string;
    PlaylistSongs: PlaylistSong[];
    author: string,
    id: string | undefined,
}
interface PlaylistEdit {
    PlaylistName: string;
    PlaylistBg: string;
    id: string | undefined,
}
// Теперь приведем playlistObj к структуре PlaylistAction
const playlistObj: PlaylistAction = {
    PlaylistName: 'Название вашего плейлиста',
    PlaylistBg: 'Цвет фона вашего плейлиста',
    PlaylistSongs: [
      // Массив объектов PlaylistSong
    ],
    author: '',
    id: '',
};
interface AuthState {
  loading: boolean;
  songs: Song[];
  playlists: PlaylistAction[];
  onePlaylist: PlaylistAction[];
  selectedSong: PlaylistAction[];
  myPlaylists: PlaylistAction[];
}

export const postSong = createAsyncThunk<Song[], PostAction>(
  "songs/postSong",
  async (songObj, { dispatch }) => {
    const res = await axios.post(SONGS_API, songObj);
    //dispatch(getUsers())
    return res.data;
  }
);

export const createPlaylist = createAsyncThunk(
  'songs/createPlaylist',
  async (playlistObj: PlaylistAction, { dispatch }) => {
    const res = await axios.post(`${PLAYLISTS_API}/`, playlistObj);
    dispatch(getPlaylists())
    return res.data;
  }
);

//export const editPlaylist = createAsyncThunk(
//  'songs/editPlaylist',
//  async (playlistObj: PlaylistEdit, { dispatch }) => {
//    const res = await axios.patch(`${PLAYLISTS_API}/${playlistObj.id}/`, playlistObj);
//    dispatch(getPlaylists())
//    return res.data;
//  }
//);


export const getPlaylists = createAsyncThunk(
  'songs/getPlaylists ',
  async (_, { dispatch }) => {
    const res = await axios.get(PLAYLISTS_API);
    //dispatch(getPlaylists())
    return res.data
  }
)

export const getSongs = createAsyncThunk(
  'songs/getSongs ',
  async (_, { dispatch }) => {
    const res = await axios.get(SONGS_API);
    //dispatch(getPlaylists())
    return res.data
  }
)

export const getOnePlaylist = createAsyncThunk(
  'songs/getOnePlaylist ',
  async ({ id }: { id: string | undefined }, { dispatch }) => {
    const res = await axios.get(`${PLAYLISTS_API}/${id}`);
    //dispatch(getPlaylists())
    return res.data
  }
)

export const editPlaylist = createAsyncThunk(
  'songs/editPlaylist',
  async (playlistObj: PlaylistEdit, { dispatch }) => {
    // Функция для фильтрации только не пустых полей
    const filterEmptyFields = (obj: any) => {
      return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
    };

    // Создаем объект только с не пустыми полями
    const filteredPlaylistObj = filterEmptyFields(playlistObj);

    // Если нет изменений, ничего не отправляем
    if (Object.keys(filteredPlaylistObj).length === 0) {
      console.log('Нет изменений');
      return;
    }

    // Отправляем изменения на сервер
    const res = await axios.patch(`${PLAYLISTS_API}/${playlistObj.id}/`, filteredPlaylistObj);
    
    // Запрашиваем обновленный список плейлистов
    dispatch(getOnePlaylist({id: playlistObj.id}));

    return res.data;
  }
);

//export const addToPlaylist = createAsyncThunk(
//  'songs/addToPlaylist',
//  async ( {playlistId, songObj}: {playlistId: string, songObj: PlaylistSong | undefined} ) => {
//    const res = await axios.post(`${PLAYLISTS_API}/${playlistId}/PlaylistSongs/`, songObj )
//  }
//)


export const addToPlaylist = createAsyncThunk(
  'songs/addToPlaylist',
  async ({ playlistId, songObj }: { playlistId: string; songObj: PlaylistSong | undefined }) => {
    try {
      // Получаем текущие данные плейлистов
      const playlistsRes = await axios.get(PLAYLISTS_API);
      console.log(playlistsRes)
      const playlists = playlistsRes.data;

      // Находим нужный плейлист по его идентификатору
      const playlistToUpdate = playlists.find((playlist: PlaylistAction) => playlist.id === playlistId);

      if (playlistToUpdate) {
        // Если плейлист найден, добавляем новую песню в массив PlaylistSongs
        playlistToUpdate.PlaylistSongs.push(songObj);

        // Отправляем обновленные данные плейлиста на сервер
        await axios.put(`${PLAYLISTS_API}/${playlistId}`, playlistToUpdate);

        return playlistToUpdate;
      } else {
        // Обработка случая, если плейлист не найден
        console.error(`Плейлист с идентификатором ${playlistId} не найден.`);
        throw new Error('Плейлист не найден.');
      }
    } catch (error) {
      console.error('Ошибка при добавлении песни в плейлист:', error);
      throw error;
    }
  }
);

const songSlice = createSlice({
  name: 'songs',
  initialState: {
    loading: false,
    songs: [],
    playlists: [],
    onePlaylist: [],
    selectedSong: [],
    myPlaylists: [],
  } as AuthState,
  reducers: {
    setSelectedSong: (state, action) => {
      state.selectedSong = action.payload;
      //console.log(action.payload)
    },

  },
  extraReducers: (builder) => {
    builder
    .addCase(postSong.fulfilled, (state, action) => {
      state.loading = false;
      //console.log(action.payload)
    })
    .addCase(createPlaylist.fulfilled, (state, action) => {
      state.playlists = action.payload;
      //console.log(action.payload)
    })
    .addCase(editPlaylist.fulfilled, (state, action) => {
      state.playlists = action.payload;
      //console.log(action.payload)
    })
    .addCase(addToPlaylist.fulfilled, (state, action) => {
      //console.log(action.payload)
    })
    .addCase(getPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload
      console.log(action.payload);
      const accountObjString = localStorage.getItem('accountObj');
      if (accountObjString) {
        const parsedAccountObj = JSON.parse(accountObjString);
        state.myPlaylists = action.payload.filter((playlist: PlaylistAction) => playlist.author === parsedAccountObj.username)
      }
      console.log(state.myPlaylists)
    })
    .addCase(getSongs.fulfilled, (state, action) => {
      state.songs = action.payload
    })
    .addCase(getOnePlaylist.fulfilled, (state, action) => {
      state.onePlaylist = action.payload
    })
  }
})

export const { setSelectedSong } = songSlice.actions;

export default songSlice.reducer