"use client";
import React, { useEffect, useState } from 'react';

interface Conversation {
    conversation_id: string;
    is_active: boolean;
    created_at: string;
    user_id: number;
}

const SidePanel: React.FC<{ onResume: (conversation: Conversation) => void }> = ({ onResume }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        const userId = localStorage.getItem('user_id');
        const accessToken = localStorage.getItem('access_token');

        if (!userId || !accessToken) {
            setError('User ID or access token is missing');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/get_all_user_conversations/${userId}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch conversations');
            }

            const data: Conversation[] = await response.json();
            setConversations(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const startNewConversation = async () => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            setError('Access token is missing');
            return;
        }

        try {
            const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/start_new_conversation/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to start a new conversation');
            }

            fetchConversations();
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const resumeConversation = async (conversationId: string) => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            setError('Access token is missing');
            return;
        }

        try {
            const response = await fetch(`https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/resume_old_conversation/${conversationId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to resume conversation');
            }

            const data = await response.json();
            onResume(data); // Pass the resumed conversation to the parent component
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const deleteConversation = async (conversationId: string) => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            setError('Access token is missing');
            return;
        }

        try {
            const response = await fetch(`https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/delete_conversation/${conversationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete conversation');
            }

            fetchConversations(); // Refresh the conversation list after deletion
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="flex">
            <div
                className={`bg-black text-white fixed h-screen transition-all duration-300 z-10 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
                <div className="flex flex-col items-center">
                    <div className="mt-4 flex items-center">
                        <a href="#" className="text-white hover:text-gray-300 text-2xl font-bold">
                            Chat History
                        </a>
                    </div>

                    <button
                        onClick={startNewConversation}
                        className="mt-4 mb-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                    >
                        Start New Conversation
                    </button>

                    <div className="mt-4 w-full px-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            conversations.map(convo => (
                                <div key={convo.conversation_id} className="bg-gray-700 p-3 mb-3 rounded shadow-md hover:bg-gray-600">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-300">{new Date(convo.created_at).toLocaleDateString()}</span>
                                        {convo.is_active && (
                                            <span className="text-green-500">
                                                &#10004; {/* Check mark */}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-lg text-white font-semibold mb-1">Conversation ID:</p>
                                    <p className="text-sm text-gray-400 truncate">{convo.conversation_id}</p>
                                    <button
                                        onClick={() => resumeConversation(convo.conversation_id)}
                                        className="mt-1 p-1 bg-green-600 hover:bg-green-700 text-white rounded"
                                    >
                                        Resume
                                    </button>
                                    <button
                                        onClick={() => deleteConversation(convo.conversation_id)}
                                        className="mt-1 ml-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className={`flex-1 p-4 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="ml-auto">
                    <button
                        className="bg-blue-600 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
