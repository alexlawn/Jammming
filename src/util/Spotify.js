let accessToken;
const clientId = '9a0c73ca58354ba783f529e6023bb240';
const redirectUri = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
         // If the access token is not already set, check the URL to see if it has just been obtained. Can check URL using window.location.href
        // Check for access token match:
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token when it expires:
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },
    savePlaylist(name, trackUris) {
        if(!name || !trackUris.length){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;
        return fetch(
            'https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify ({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playListId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackUris})
                    })
            })
        })
    }
}

export default Spotify;