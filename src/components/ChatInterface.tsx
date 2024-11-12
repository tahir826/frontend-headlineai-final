"use client";
import { useState, useEffect, useRef } from 'react';
import formatResponse from '@/utils/formateResponse';
import { FaChevronRight, FaChevronLeft, FaPlus, FaSpinner, FaTrash, FaPaperPlane } from 'react-icons/fa';
import { isTokenExpired, refreshAccessToken } from "@/utils/tokenUtils";
import { useRouter } from 'next/navigation';

const ChatInterface = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ user: string, bot?: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [access_token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [conversations, setConversations] = useState<any[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();  // Add router for navigation

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
startNewConversation();
        if (storedToken) {
            if (isTokenExpired(storedToken)) {
                router.push('/login');  // Redirect to login if token is expired
            } else {
                setToken(storedToken);
                setIsLoggedIn(true);
                // Automatically start a new conversation if token is valid
            }
        } else {
            router.push('/login');  // Redirect if no token found
        }
    }, []);

    useEffect(() => {
        if (access_token) {
            fetchUserConversations();
        }
    }, [access_token]);

    const fetchUserConversations = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/get_all_user_conversations/', {
                headers: { 'Authorization': `Bearer ${access_token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch conversations');
            const data = await response.json();
            setConversations(data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const startNewConversation = async () => {
        setLoading(true);
        setMessages([]);
        try {
            const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/start_new_conversation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            });

            if (!response.ok) throw new Error('Failed to start a new conversation');

            const newConversation = await response.json();
            const { conversation_id, created_at } = newConversation;

            // Add the new conversation to the state
            setConversations(prevConversations => [{ conversation_id, created_at }, ...prevConversations]);

            // Set the new conversation as the active one
            setActiveConversationId(conversation_id);

            // Automatically fetch messages if any (usually empty in a new conversation)
            setMessages([]);

        } catch (error) {
            console.error('Error starting new conversation:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteConversation = async (conversationId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/delete_conversation/${conversationId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${access_token}` }
            });
            if (!response.ok) throw new Error('Failed to delete conversation');

            // Remove the deleted conversation from the state
            setConversations(prevConversations =>
                prevConversations.filter(conv => conv.conversation_id !== conversationId)
            );

            // Reset active conversation if it was deleted
            if (activeConversationId === conversationId) {
                setActiveConversationId(null);
                setMessages([]);
            }

        } catch (error) {
            console.error('Error deleting conversation:', error);
        } finally {
            setLoading(false);
            fetchUserConversations();
        }
    };

    const resumeConversation = async (conversationId: string) => {
        setLoading(true);
        setMessages([]);
        setActiveConversationId(conversationId); // Set the active conversation
        try {
            const response = await fetch(`https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/resume_old_conversation/${conversationId}`, {
                headers: { 'Authorization': `Bearer ${access_token}` }
            });
            if (!response.ok) throw new Error('Failed to resume conversation');

            const data = await response.json();
            setMessages(data.messages.map((msg: any) => ({
                user: msg.role === 'human' ? msg.content : '',
                bot: msg.role === 'ai' ? formatResponse(msg.content) : undefined
            })));
        } catch (error) {
            console.error('Error resuming conversation:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (input.trim() && access_token) {
            const userMessage = input;
            setMessages(prev => [...prev, { user: userMessage }]);
            setInput('');
            setIsWaitingForResponse(true);
            try {
                const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/ai/call_agent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: JSON.stringify({ query: userMessage })
                });

                if (!response.ok) throw new Error('Failed to fetch data from backend');

                const data = await response.json();
                const botReply = data.messages[data.messages.length - 1].content;
                const formattedBotReply = formatResponse(botReply);

                setMessages(prev => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1] = { user: userMessage, bot: formattedBotReply };
                    return updatedMessages;
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsWaitingForResponse(false);
            }
        }
        fetchUserConversations();
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar */}
            <div className={`flex-shrink-0 flex flex-col bg-gray-800 transition-transform duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-y-auto`}>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`mt-16 ml-2 absolute top-4 left-${sidebarOpen ? '64' : '4'} p-2 rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-500 focus:outline-none shadow-lg z-10`}
                >
                    {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </button>

                {sidebarOpen && (
                    <div className="p-4 space-y-4">
                        <button onClick={startNewConversation} className="bg-green-600 ml-8 text-white p-2 rounded-lg flex items-center space-x-2">
                            {loading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                            <span>New Conversation</span>
                        </button>

                        <h2 className="text-white text-lg mb-4">Conversations</h2>
                        {loading ? (
                            <div className="text-center text-white"><FaSpinner className="animate-spin" /></div>
                        ) : (
                            <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                {conversations.map(conversation => (
                                    <div
                                        key={conversation.conversation_id}
                                        className={`flex flex-col p-3 rounded-lg transition duration-200 cursor-pointer ${activeConversationId === conversation.conversation_id ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                                            }`}
                                        onClick={() => resumeConversation(conversation.conversation_id)} // Automatically resume conversation
                                    >
                                        <div>
                                            <span>{new Date(conversation.created_at).toLocaleDateString()}</span>
                                            <br />
                                            <span>{new Date(conversation.created_at).toLocaleTimeString()}</span>
                                        </div>
                                        {activeConversationId !== conversation.conversation_id && (
                                            <div className="flex space-x-1 mt-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent click from resuming conversation
                                                        deleteConversation(conversation.conversation_id);
                                                    }}
                                                    className="text-red-400 hover:underline"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Chat interface */}
            <div className="flex-1 overflow-y-auto p-4 pb-28 flex flex-col items-center justify-start">
                <div ref={chatContainerRef} className="max-w-2xl w-full">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-12 flex flex-col items-center">
                            <div className="w-auto max-w-[90%] p-3 rounded-lg shadow-md bg-gray-600 text-right mb-4 text-gray-200 inline-block break-words">
                                <strong>You:</strong> {msg.user}
                            </div>
                            {msg.bot ? (
                                <div className="w-auto max-w-[90%] p-3 rounded-lg shadow-md bg-gray-500 text-left break-words text-gray-200" dangerouslySetInnerHTML={{ __html: msg.bot }} />
                            ) : isWaitingForResponse ? (
                                <div className="w-auto max-w-[90%] p-3 rounded-lg shadow-md bg-gray-500 text-left break-words text-gray-200">
                                    <FaSpinner className="animate-spin inline mr-2" /> Waiting for response...
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>

            {/* Input */}
            <div className="fixed bottom-4 mb-5 left-0 right-0 max-w-2xl mx-auto px-4">
                <div className="flex items-center bg-gray-800 text-white rounded-lg shadow-md focus-within:ring-2 focus-within:ring-blue-500">
                    <input
                        type="text"
                        placeholder="Enter Your Query..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isWaitingForResponse} // Disable input while waiting
                        className="flex-1 bg-transparent p-3 rounded-l-lg outline-none text-white"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isWaitingForResponse} // Disable button while waiting
                        className={`p-3 rounded-lg mr-1 ${isWaitingForResponse ? 'bg-gray-700 cursor-not-allowed' : ' hover:bg-blue-500'} transition-colors duration-300`}
                    >
                        {isWaitingForResponse ? (
                            <FaSpinner className="animate-spin text-white" />
                        ) : (
                            <FaPaperPlane className="text-white" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
