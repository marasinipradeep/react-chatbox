import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Join() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
            </div>

        </div>

    )
}
