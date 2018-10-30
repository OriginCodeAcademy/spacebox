import { connect } from 'react-redux';
import DefaultQueue from './DefaultQueue';

function mapStoreToProps(store) {
  return {
	  queueId: store.DQueue.queueId,
    defaultSongs: store.DQueue.defaultSongs,
    inputValue: store.DQueue.inputValue,
    userId: store.Login.userId
  }
}

export default connect(mapStoreToProps)(DefaultQueue);
