import socket from "../../socket";
import {useEffect, useState} from "react";
import ACTIONS from "../../socket/actions";
import {v4} from 'uuid';
import {useNavigate} from "react-router";

export default function Main() {
    const navigate = useNavigate();
    const [rooms, updateRooms] = useState([])

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
            updateRooms(rooms);
        })
    }, [])

    return(
        <>
            <h1>Available rooms</h1>
            <ul>
                {
                    rooms.map(roomID => (
                        <li key={roomID}>
                            {roomID}
                            <button onClick={() => {
                                navigate(`/room/${roomID}`)
                            }}>Join room</button>
                        </li>
                    ))
                }
            </ul>
            <button onClick={() => {
                navigate(`/room/${v4()}`)
            }}>Create new room</button>
        </>
    )
}