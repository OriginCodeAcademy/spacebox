import { connect } from 'react-redux';
import CurrentSong from './CurrentSong';

function mapStoreToProps(store) {
  return {
    playing: store.Song.playing,
    queueId: store.DQueue.queueId
  };
}

export default connect(mapStoreToProps)(CurrentSong);
