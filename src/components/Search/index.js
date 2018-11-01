import { connect } from 'react-redux';
import Search from './Search';

function mapStoreToProps(store) {
	return {
		data           : store.Search.data,
		disabled	   : store.Search.disabled,
		error	       : store.Search.error,
		query          : store.Search.query,
		userId         : store.Login.userId,
		selectedSongUri: store.Search.selectedSongUri,
		type           : store.Search.type,
	};
}

export default connect(mapStoreToProps)(Search);
