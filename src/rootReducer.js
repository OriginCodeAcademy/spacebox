import { combineReducers } from 'redux';
import HomePageReducer from './components/HomePage/HomePageReducer';
import SearchReducer from './components/Search/SearchReducer';
import DQueueReducer from './components/DefaultQueue/DQueueReducer';
import SQueueReducer from './components/SongQueue/SQueueReducers';

const rootReducer = combineReducers({
	HomePage: HomePageReducer,
	Search: SearchReducer,
	DQueue: DQueueReducer,
	SQueue: SQueueReducer
});

export default rootReducer;