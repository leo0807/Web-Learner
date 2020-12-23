import './App.css';
import './components/Login';
import React, {useEffect} from 'react'
import Login from './components/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer'
import Player from './components/Player'
// Allow to grab music

const spotify = new SpotifyWebApi();
function App() {
  // const [token, setToken] = useState(null);
  const [{ token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    // GET THE TOKEN
    const hash = getTokenFromUrl();
    // clear the token on url, for security
    window.location.hash = "";
    const _token = hash.access_token;
    // setToken(_token);
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token
      })
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
      // Give access token to spotify api 
      spotify.setAccessToken(_token);
      // Get the user account and return a promise
      spotify.getMe().then(user => {
        dispatch({
          type: "SET_USER",
          user: user
        })
      });
      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      })
      spotify.getPlaylist("37i9dQZF1EMfvvW6t7sG5B").then(response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response
        })
      })
      spotify.getMyTopArtists().then(response => {
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response
        })
      })
  
    }
  }, [token, dispatch])
  return (
    <div className="App">
      {
        token ? (
          // have token => successfully login
          <Player spotify={spotify}/>)
          : (
            <Login />
          )
      }
      <Login />
    </div>
  );
}

export default App;
