import { connect } from 'react-redux';
import Room from './Room';

function mapStoreToProps(store) {
  return {
	queueId: store.Room.queueId
  };
}
export default connect(mapStoreToProps)(Room);