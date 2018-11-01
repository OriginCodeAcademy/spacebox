import { connect } from 'react-redux';
import Search from './Search';

function mapStoreToProps(store) {
	return {
		disabled	   : store.Search.disabled,
		error	       : store.Search.error,
		type           : store.Search.type,
		data           : store.Search.data,
		query          : store.Search.query,
		selectedSongUri: store.Search.selectedSongUri,
	};
}
export default connect(mapStoreToProps)(Search);