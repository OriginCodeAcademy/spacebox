import { connect } from 'react-redux';
import Search from './Search';

function mapStoreToProps(store) {
	return {
		uri: store.Search.uri,
		disabled: store.Search.disabled,
		error: store.Search.error,
		searchType: store.Search.searchType,
		search: store.Search.search
	};
}
export default connect(mapStoreToProps)(Search);