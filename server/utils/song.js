var SpotifyWebApi = require('spotify-web-api-node');
const { getAccessToken } = require('../../server/utils/playlist');
const app = require('../server')

  /**
   * takes a track object and formats it
   * @param {{}} track the track object
   * @returns {{ id: String, name: String, artist: String, albumCover: String, duration: Number, uri: String }} formatted track
   */
  const formatSong = track => ({
    name: track.name,
    duration: track.duration_ms,
    artist: track.album.artists[0].name,
    uri:track.uri,
    albumCover: track.album.images[0].url,
    spotifyId:track.album.id
  })

function getSong(songUri, userID) {
  return new Promise((resolve, reject) => {
    
    if (songUri == undefined) {
      resolve('Bad URI');
      return false;
    } 
    
    if(userID == undefined) {
      resolve('Bad userID');
      return false;
    }
    var trackData;
    const { Song } = app.models;
  
      Song
        .find({ where: { uri: songUri } })
        .then(song => {
      
          //the following checks if the song does not exist in Song model
          //if no song, go to api and get song data
          if(song==false){
            getAccessToken(userID)
                          .then(accessToken => {
                            const spotifyApi = new SpotifyWebApi({ accessToken });
            
            spotifyApi.getTrack(songUri.slice(14)) //returns a response object {}
              .then(res => {
                trackData = formatSong(res.body); //trackData is an object of a song 
                Song.create(trackData)
                  .then(() => resolve(trackData))
              })
              .catch(err => console.log('HERE IS THE ERROR DETAILS:', err));
            })
            .catch(err => console.log(err, " - THIS IS ERROR DETAILS"))
            
          }else{
  
          ////if song exists then return it
            resolve(song)
          }
        })
  })
}

module.exports = {
  formatSong,
  getSong
}