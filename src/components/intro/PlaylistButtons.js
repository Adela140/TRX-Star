import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { addPlaylist, updateLoaded } from '../../redux/slices/playlistSlice';
import { setDifficulty, setDuration, setFocus, setMuscleGroups, setMuscles } from '../../redux/slices/selectSlice';
import { store } from '../../redux/store';
import Modal from 'react-bootstrap/Modal'

const PlaylistButtons = ({playlists, handleDelete}) => {

    const navigate = useNavigate();

    const clickHandler = (playlist) => {
        console.log("Playlist data", playlist.playlist);
        store.dispatch(addPlaylist(playlist.playlist));
        store.dispatch(setDifficulty(playlist.select.difficulty));
        store.dispatch(setFocus(playlist.select.focus));
        store.dispatch(setDuration(playlist.select.duration));
        playlist.select.muscleGroups?.map((group) =>{
            store.dispatch(setMuscleGroups(group));
        })
        playlist.select.muscles?.map((muscle) =>{
            store.dispatch(setMuscles(muscle));
        })
        store.dispatch(updateLoaded(true));
        navigate(`/playlist`)
    }

    return (
        <Modal.Body
                className='load-modal'>
                {
                    playlists.map((playlist) => {
                        return (
                            <button
                                className='load-modal__button'
                                key={playlist.name}>
                                <p
                                    onClick={() => {clickHandler(playlist)}}
                                    key={playlist.name}
                                    className="load-modal__button__playlist">
                                    {playlist.name}
                                </p>
                                <BsTrash 
                                    size={20}
                                    className="load-modal__button__delete"
                                    onClick={() => handleDelete(playlist)}/>
                            </button>
                        )
                    })
                }
            </Modal.Body>
    )

}

export default PlaylistButtons