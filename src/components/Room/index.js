import { connect } from 'react-redux';
import Room from './Room';

function mapStoreToProps(store) {
  return {
  queueId: store.Room.queueId,
  messageList: store.Room.messageList
  };
}
export default connect(mapStoreToProps)(Room);