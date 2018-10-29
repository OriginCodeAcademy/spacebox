import { connect } from 'react-redux';
import Search from './Search';

function mapStoreToProps(store) {
	return {
		disabled	: store.Search.disabled,
		error		: store.Search.error,
		searchBy	: store.Search.searchBy,
		uri			: store.Search.uri,
	};
}
export default connect(mapStoreToProps)(Search);