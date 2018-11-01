import { connect } from 'react-redux';
import CurrentSong from './CurrentSong';

function mapStoreToProps(store) {
  return {
    // song: store.Song.song,
    // artist: store.Song.artist,
    // length: store.Song.length,
    // playing: store.Song.playing,
    queueId: store.DQueue.queueId
  };
}

export default connect(mapStoreToProps)(CurrentSong);
