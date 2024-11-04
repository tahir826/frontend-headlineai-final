import React, { useEffect } from 'react';

interface Conversation {
    id: string;
    title: string; // Adjust this based on your actual data structure
}

interface SidePanelProps {
    conversations: Conversation[];
    onResume: (id: string) => void;
    onDelete: (id: string) => void;
    onNewConversation: () => void;
    accessToken: string | null; // Access token for API calls
    fetchConversations: (token: string) => Promise<void>; // Function to refresh conversations
}

const SidePanel: React.FC<SidePanelProps> = ({ conversations, onResume, onDelete, onNewConversation, accessToken, fetchConversations }) => {
    useEffect(() => {
        // Automatically fetch conversations when access token changes
        if (accessToken) {
            fetchConversations(accessToken);
        }
    }, [accessToken, fetchConversations]);

    const handleNewConversation = async () => {
        if (!accessToken) return;

        // Start a new conversation
        const response = await fetch(`https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/start_new_conversation/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            await fetchConversations(accessToken); // Refresh the conversation list
            onNewConversation(); // Notify the parent to clear messages
        } else {
            console.error('Failed to start new conversation');
        }
    };

    return (
        <div className="w-1/4 bg-gray-800 p-4">
            <h2 className="text-white text-lg mb-4">Conversations</h2>
            <button onClick={handleNewConversation} className="w-full p-2 bg-green-500 text-white rounded-lg mb-2">
                Start New Conversation
            </button>
            <div className="space-y-2">
                {conversations.length > 0 ? (
                    conversations.map(conversation => (
                        <div key={conversation.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                            <span className="text-white">{conversation.title}</span>
                            <div>
                                <button onClick={() => onResume(conversation.id)} className="text-blue-400 mr-2">Resume</button>
                                <button onClick={() => onDelete(conversation.id)} className="text-red-400">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400">No conversations available</div>
                )}
            </div>
        </div>
    );
};

export default SidePanel;
