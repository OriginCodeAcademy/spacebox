import { connect } from 'react-redux';
import DefaultQueue from './DefaultQueue';

function mapStoreToProps(store) {
  return {
	  queueId: store.DQueue.queueId,
    defaultSongs: store.DQueue.defaultSongs,
    inputValue: store.DQueue.inputValue,
    userID: store.Login.userID
  }
}

export default connect(mapStoreToProps)(DefaultQueue);
