import { connect } from 'react-redux';
import DefaultQueue from './DefaultQueue';

function mapStoreToProps(store) {
	return {
		// defaultQueue: store.dQueue
	}
}

export default connect(mapStoreToProps)(DefaultQueue);
