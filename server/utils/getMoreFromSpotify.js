var SpotifyWebApi = require('spotify-web-api-node');
const { getAccessToken } = require('../../server/utils/playlist')

const app = require('../server');

function getMoreMusicFromSpotify(userId, query, types) {
    return new Promise((resolve, reject) => {
        getAccessToken(userId)
            .then(accessToken => {
                const spotifyApi = new SpotifyWebApi({ accessToken });
                spotifyApi.search(query, types)
                    .then(res => {
                        let trackData = res.body.tracks.items.map(({ name, uri, album }) => ({
                            name,
                            uri,
                            artist: album.artists[0].name
                        }) )
                        resolve(trackData);
            }
            )
            .catch(err => console.log('we caught an error in get more music', err))
    })
}
)}
module.exports = { getMoreMusicFromSpotify }