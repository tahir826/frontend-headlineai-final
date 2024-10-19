"use client";
import React, { useState, useEffect } from 'react';

interface Message {
    user: string;
    bot: string;
}

interface Conversation {
    id: number;
    name: string;
    messages: Message[];
}

const History = () => {
    const [history, setHistory] = useState<Conversation[]>([]);
    const [currentChatId, setCurrentChatId] = useState<number>(1);
    const [token, setToken] = useState<string | null>(null);

    // Fetch chat history from backend
    useEffect(() => {
        const fetchHistory = async () => {
            const storedToken = localStorage.getItem('access_token'); // Updated to "access_token"
            if (storedToken) {
                setToken(storedToken);
                try {
                    const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/get_user_conversations', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${storedToken}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch chat history');
                    }
                    const data: Conversation[] = await response.json();
                    setHistory(data);
                } catch (error) {
                    console.error('Error fetching chat history:', error);
                }
            }
        };
        fetchHistory();
    }, []);

    // Handle conversation click to set the current chat
    const handleConversationClick = (convoId: number) => {
        setCurrentChatId(convoId);
    };

    // Start a new chat and send it to the backend
    const handleNewChat = async () => {
        try {
            const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/start_conversation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to start new chat');
            }
            const newChat = await response.json(); // Assuming the response contains the new chat details
            setHistory([...history, newChat]);
            setCurrentChatId(newChat.id);
        } catch (error) {
            console.error('Error starting new chat:', error);
        }
    };

    return (
        <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Conversation History</h2>
            {history.map(convo => (
                <div
                    key={convo.id}
                    className={`mb-2 p-2 bg-white rounded shadow cursor-pointer ${convo.id === currentChatId ? 'bg-blue-100' : ''}`}
                    onClick={() => handleConversationClick(convo.id)}
                >
                    <h3>{convo.name}</h3>
                </div>
            ))}
            <button
                onClick={handleNewChat}
                className="mt-4 p-2 bg-zinc-900 text-white rounded w-full"
            >
                Start New Conversation
            </button>
        </div>
    );
};

export default History;
