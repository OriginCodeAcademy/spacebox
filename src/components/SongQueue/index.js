import { connect } from 'react-redux';
import SongQueue from './SongQueue';

function mapStoreToProps(store) {
	return {
		// SQueue: store.SQueue
	}
}

export default connect(mapStoreToProps)(SongQueue);
