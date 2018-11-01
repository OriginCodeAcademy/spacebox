var SpotifyWebApi = require('spotify-web-api-node');
const { getAccessToken } = require('../../server/utils/playlist')
const { formatSong } = require('../../server/utils/song');

const app = require('../server');

function getMoreMusicFromSpotify(userId, query, types) {
    return new Promise((resolve, reject) => {
        console.log('this is user id: ', userId)
        getAccessToken(userId)
            .then(accessToken => {
                console.log('access token', accessToken)
                const spotifyApi = new SpotifyWebApi({ accessToken });
                console.log('query', query)
                console.log('types', types)
                spotifyApi.search(query, types)
                    .then(res => {
                        // console.log('this is res', res.body.tracks.items);
                        let trackData = res.body.tracks.items.map(({ name, uri, album }) => ({
                            name,
                            uri,
                            artist: album.artists[0].name
                        }) )
                        resolve(trackData);
                console.log('this is result: ', trackData)
            }

            )
            .catch(err => console.log('we caught an error in get more music', err))
    })
}
)}
module.exports = { getMoreMusicFromSpotify }