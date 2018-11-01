import { connect } from 'react-redux';
import HomePage from './HomePage';

function mapStoreToProps(store) {
	return {
		songs: store.SQueue.songs,
		queueId: store.DQueue.queueId
	};
}

export default connect(mapStoreToProps)(HomePage);
