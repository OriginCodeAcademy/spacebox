import { connect } from 'react-redux';
import Search from './Search';

function mapStoreToProps(store) {
	return {
		uri: store.Search.uri,
		disabled: store.Search.disabled,
		error: store.Search.error
	};
}
export default connect(mapStoreToProps)(Search);