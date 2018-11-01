import { connect } from 'react-redux';
import SongQueue from './SongQueue';

function mapStoreToProps(store) {
	return {
		songs: store.SQueue.songs,
		queueId: store.DQueue.queueId
	}
}

export default connect(mapStoreToProps)(SongQueue);
