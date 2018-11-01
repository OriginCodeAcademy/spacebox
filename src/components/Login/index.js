import { connect } from 'react-redux';
import Login from './Login';

function mapStoreToProps(store) {
	return {
		username: store.Login.username,
		password: store.Login.password,
		token: store.Login.token,
		userID: store.Login.userID
	};
}

export default connect(mapStoreToProps)(Login);
