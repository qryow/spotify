import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { ACCOUNT_API, PLAYLISTS_API } from "../../helpers/const";
//import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string | number;
  username: string;
  password: string;
  email: string;
}
interface AuthState {
  loading: boolean;
  accounts: User[];
  activeAcc: null | object;
}
interface RegisterUserAction {
  username: string;
  password: string;
  password_confirm: string;
  isActive: boolean;
  avatar: string;
  isVerified: boolean,
  singerName: string,
  singerBg: string;
}
interface LoginUserAction {
  id: string | number;
  username: string;
  password: string;
  isActive: boolean;
}
interface singerAction {
  id: string | number;
  isVerified: boolean;
  singerName: string;
  singerbg: string;
}

export const registerUser = createAsyncThunk<User[], RegisterUserAction>(
  "account/registerUser",
  async (accountObj, { dispatch }) => {
    const res = await axios.post(ACCOUNT_API, accountObj);
    dispatch(getUsers())
    return res.data;
  }
);

export const loginUser = createAsyncThunk<User[], LoginUserAction>(
  "account/loginUser",
  async (accountObj, { dispatch }) => {
    const res = await axios.patch(`${ACCOUNT_API}/${accountObj.id}`, accountObj);
    dispatch(getUsers())
    return res.data;
  }
);

export const patchSinger = createAsyncThunk<User[], singerAction>(
  "account/patchSinger",
  async (accountObj, { dispatch }) => {
    const res = await axios.patch(`${ACCOUNT_API}/${accountObj.id}`, accountObj);
    dispatch(getUsers())
    return res.data;
  }
);

export const getUsers = createAsyncThunk(
  'account/getUsers',
  async () => {
    const res = await axios.get(ACCOUNT_API);
    return res.data
  }
)

export const getOneUser = createAsyncThunk(
  'account/getOneUser',
  async ({ id }: { id: string | number }) => {
    const res = await axios.get(`${ACCOUNT_API}/${id}`)
    return res.data
  }
)

//export const createPlaylist = createAsyncThunk(
//  'account/createPlaylist',
//  async ({ playlistObj }: { playlistObj: PlaylistAction }) => {
//    // Генерируем уникальный идентификатор для нового плейлиста
//    const newPlaylistId = Date.now();

//    // Добавляем уникальный идентификатор к новому плейлисту
//    const newPlaylist = {
//      ...playlistObj.playlist,
//      id: newPlaylistId,
//    };

//    // Отправляем запрос на сервер с новым плейлистом
//    const res = await axios.post(`${ACCOUNT_API}`, { playlist: newPlaylist });
//    return res.data;
//  }
//);

//export const createPlaylist = createAsyncThunk(
//  'account/createPlaylist',
//  async (playlistObj: PlaylistAction) => {
//    // Получаем текущий список аккаунтов с сервера
//    const res = await axios.get(`${ACCOUNT_API}`);
//    const currentAccounts = res.data.account;

//    // Находим аккаунт пользователя в текущем списке
//    const currentUser = currentAccounts.find((acc) => acc.id === playlistObj.playlist.id);

//    // Если аккаунт пользователя найден
//    if (currentUser) {
//      // Обновляем список плейлистов пользователя
//      currentUser.playlist = playlistObj.playlist;
      
//      // Отправляем обновленный список на сервер
//      const updateRes = await axios.put(`${ACCOUNT_API}`, { account: currentAccounts });
//      return updateRes.data;
//    } else {
//      // Если аккаунт пользователя не найден, бросаем ошибку
//      throw new Error('Пользователь не найден');
//    }
//  }
//);



const accountSlice = createSlice({
  name: 'account',
  initialState: {
    loading: false,
    accounts: [],
    activeAcc: null,
  } as AuthState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state, action) => {
      state.loading = true
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(loginUser.pending, (state, action) => {
      state.loading = true
    })
    .addCase(patchSinger.pending, (state, action) => {
      console.log(action.payload)
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.activeAcc = action.payload;
      //addDataToLocalStorage({username: action.payload.username, isActive: action.payload.isActive, id: action.payload.id})
    })
    .addCase(getOneUser.fulfilled, (state, action) => {
      state.activeAcc = action.payload
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.accounts = action.payload
    })
  }
})

export default accountSlice.reducer