import { combineReducers } from 'redux';
import HomePageReducer from './components/HomePage/HomePageReducer';
import SearchReducer from './components/Search/SearchReducer';
import DQueueReducer from './components/DefaultQueue/DQueueReducer';
import SQueueReducer from './components/SongQueue/SQueueReducers';
import SongReducer from './components/CurrentSong/SongReducer';
import LoginReducer from './components/Login/LoginReducer'
import RoomReducer from './components/Room/RoomReducer';

const rootReducer = combineReducers({
  HomePage: HomePageReducer,
  Search: SearchReducer,
  DQueue: DQueueReducer,
  SQueue: SQueueReducer,
  Song: SongReducer,
  Login: LoginReducer,
  Room: RoomReducer
});

export default rootReducer;
