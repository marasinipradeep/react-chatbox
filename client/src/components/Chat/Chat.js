import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;


export default function Chat({ location }) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:8080';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        //emit event from client side(can be anything (join) should be same exact string on backend as well,receive data on backend)
        socket.emit('join', { name, room }, () => {

        });
        //have to finish with return this is used for unmounting

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search])


    //Second one handling the messages can use useEffect as much as you want.

    //The use effect is hook that lets you perform side effects function components
    //This is equivalent to componentDisMount and componentDidUpdate
    //Have to use cleanup because we need to know when actually a users disconnect
    return (
        <h1>Chat</h1>
    )
}
