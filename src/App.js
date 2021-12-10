import React, {useState} from 'react'
import SearchResults from './components/SearchResults/SearchResults'
import SearchBar from './components/SearchBar/SearchBar'
import Playlist from './components/Playlist/Playlist'
import './App.css'
import Spotify from './utilities/Spotify'


const App = () => {

  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState("Favourites")
  const [playlistTracks, setPlaylistTracks] = useState([])

  const addTrack = (id) => {
    const track = searchResults.find(savedTrack => savedTrack.id === id)
    if (!track) {
      return; 
    }
    setPlaylistTracks([...playlistTracks,track])
  }

  
  const removeTrack = (id) => {
    const newlist = playlistTracks.filter(currentTrack => currentTrack.id !== id) 
    setPlaylistTracks(newlist) 
  }
   
  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    let tracksUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, tracksUris)
    .then(() => {
      updatePlaylistName("faves")
      setPlaylistTracks([])
    })
  }

  const search = (term) => {
    Spotify.search(term).then(SearchResults => {
      setSearchResults(SearchResults)
    })
  }



  return (
    <div>
  <h1>Ja<span class="highlight">mmm</span>ing</h1>
  <div class="App">
    <SearchBar onSearch={search}/>
    <div class="App-playlist">
     <SearchResults searchResults={searchResults} onAdd={addTrack}/>
      <Playlist playlistName={playlistName} playlistTracks={playlistTracks} 
      onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
    </div>
  </div>
</div>
  )
}

export default App
