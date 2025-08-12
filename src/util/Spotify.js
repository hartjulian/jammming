import { captureOwnerStack } from "react";

const clientId = '23a385f21eaf4480bbeae78519d9a156';
const redirectUri = 'http://127.0.0.1:5173';

const scope = 'user-read-private user-read-email playlist-modify-public';
const authUrl = new URL("https://accounts.spotify.com/authorize");
const tokenEndpoint = new URL("https://accounts.spotify.com/api/token");

let nextSearchUrl = '';

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
    get access_token() { return localStorage.getItem('access_token') || null; },
    get refresh_token() { return localStorage.getItem('refresh_token') || null; },
    get expires_in() { return localStorage.getItem('refresh_in') || null },
    get expires() { return localStorage.getItem('expires') || null },

    save: function (response) {
        const { access_token, refresh_token, expires_in } = response;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_in', expires_in);

        const now = new Date();
        const expiry = new Date(now.getTime() + (expires_in * 1000));
        localStorage.setItem('expires', expiry);
    }
};

const Spotify = {
    async getAccessToken() {
        // is there a current access token??  If so just return it to calling method, unless it's expired
        if (currentToken.access_token && currentToken.access_token != "undefined") {
            let now = new Date();
            let currentTokenExpiry = new Date(currentToken.expires);
            if (currentTokenExpiry < now) {
                // current token has expired.  get Refresh Token.
                const payload = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        client_id: clientId,
                        grant_type: 'refresh_token',
                        refresh_token: currentToken.refresh_token,
                    }),
                }

                const body = await fetch(tokenEndpoint, payload);
                if (body.status === 200) {
                    const response = await body.json();
                    currentToken.save(response);
                } else return;
            }
            return currentToken.access_token;
        } else {
            //  are we in a callback?  If so, we need to request an access token
            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');
            if (code) {
                const codeVerifier = localStorage.getItem('code_verifier');

                const payload = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        client_id: clientId,
                        grant_type: 'authorization_code',
                        code,
                        redirect_uri: redirectUri,
                        code_verifier: codeVerifier,
                    }),
                }

                const body = await fetch(tokenEndpoint, payload);
                if (body.status === 200) {
                    const response = await body.json();
                    currentToken.save(response);
                } else return;

                //  tidy up search params.  remove code query param so that we can refresh
                let currentUrl = new URL(window.location.href);
                currentUrl.searchParams.delete('code');
                window.location.href = currentUrl.href;

                return currentToken.access_token;
            } else {
                //  not in a callback and we don't have an access token.  Generate user auth
                //  Code verifier
                const generateRandomString = (length) => {
                    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    const values = crypto.getRandomValues(new Uint8Array(length));
                    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
                }

                const codeVerifier = generateRandomString(64);

                //  Code challenge from generated code verifier
                const sha256 = async (plain) => {
                    const encoder = new TextEncoder()
                    const data = encoder.encode(plain)
                    return window.crypto.subtle.digest('SHA-256', data)
                }
                //  function to base64 encode the hashed code verifier
                const base64encode = (input) => {
                    return btoa(String.fromCharCode(...new Uint8Array(input)))
                        .replace(/=/g, '')
                        .replace(/\+/g, '-')
                        .replace(/\//g, '_');
                }
                const hashed = await sha256(codeVerifier)
                const codeChallenge = base64encode(hashed);

                //  Request user authorisation
                //  store code verifier generated in the previous step
                window.localStorage.setItem('code_verifier', codeVerifier);

                const params = {
                    response_type: 'code',
                    client_id: clientId,
                    scope,
                    code_challenge_method: 'S256',
                    code_challenge: codeChallenge,
                    redirect_uri: redirectUri,
                }

                authUrl.search = new URLSearchParams(params).toString();
                window.location.href = authUrl.toString();
            };
        }
    },

    async search(term) {
        if (term || (nextSearchUrl != "" && nextSearchUrl !== null)) {
            const accessToken = await this.getAccessToken();
            let searchUrl = `https://api.spotify.com/v1/search?q=${term}&type=track`;
            if (nextSearchUrl != "" && nextSearchUrl !== null) {
                searchUrl = nextSearchUrl;
            }
            const payload = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            };
            return fetch(searchUrl, payload).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                nextSearchUrl = jsonResponse.tracks.next;
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    albumArtwork: track.album.images[0].url,
                }));
            });
        }
        return [];
    },

    async fetchMoreTracks() {
        return this.search();
    },

    resetSearch() {nextSearchUrl='';},

    async savePlaylist(playlistUris, playlistName) {
        if (playlistUris[0] && playlistName) {
            const accessToken = await this.getAccessToken();
            // get current users profile (user ID)
            const userProfileUrl = 'https://api.spotify.com/v1/me';
            const userProfilePayload = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            };
            const userId = await fetch(userProfileUrl, userProfilePayload).then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse.id;
            });
            // create playlist 
            const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
            const createPlaylistBody = {
                name: playlistName,
                description: ''
            };
            const createPlaylistPayload = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createPlaylistBody)
            };
            const playlistID = await fetch(createPlaylistUrl, createPlaylistPayload).then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse.id;
            })
            // add tracks to playlist
            const addToPlaylistUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
            const addToPlaylistBody = {
                uris: playlistUris
            };
            const addToPlaylistPayload = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addToPlaylistBody)
            };
            await fetch(addToPlaylistUrl, addToPlaylistPayload)
            return 1;
        }
        return 0;
    }
};


export default Spotify;