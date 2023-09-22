import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // יש להחליף את הכתובת עם כתובת השרת שלכם

function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);

    function handleSendMessage(event) {
        event.preventDefault();
        const message = event.target.elements.message.value;
        socket.emit('sendMessage', message);
        event.target.elements.message.value = '';
    }

    return (
        <div>
            <h1>Chat</h1>
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
}

function MessageList({ messages }) {
    return (
        <ul>
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </ul>
    );
}

function MessageInput({ onSendMessage }) {
    return (
        <form onSubmit={onSendMessage}>
            <input type="text" name="message" />
            <button type="submit">Send</button>
        </form>
    );
}

export default Chat;
