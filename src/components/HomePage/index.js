import { connect } from 'react-redux';
import HomePage from './HomePage';

function mapStoreToProps(store) {
	return {
		songs: store.HomePage.songs,
	};
}

export default connect(mapStoreToProps)(HomePage);