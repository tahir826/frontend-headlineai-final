"use client";
import { useState, useEffect, useRef } from 'react';
import  formatResponse  from '@/utils/formateResponse';
import SideLayout from "@/components/SidePanel"
 // Import the utility

const ChatInterface = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ user: string, bot?: string }[]>([]);  // bot can be optional until the response comes
    const [loading, setLoading] = useState(false);
    const [access_token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Ref to handle auto-scrolling
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    const handleSend = async () => {
        if (input.trim() && access_token) {
            const userMessage = input;  // Capture the current input
            setMessages(prev => [...prev, { user: userMessage }]);  // Display the user's message immediately
            setInput('');  // Clear the input field

            setLoading(true);
            try {
                const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/ai/call_agent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: JSON.stringify({ query: userMessage })  // Use captured input (userMessage)
                });

                if (!response.ok) throw new Error('Failed to fetch data from backend');

                const data = await response.json();
                const botReply = data.messages[data.messages.length - 1].content;

                // Format the bot's response before adding it
                const formattedBotReply = formatResponse(botReply);

                setMessages(prev => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1] = { user: userMessage, bot: formattedBotReply };  // Update the last message with bot's response
                    return updatedMessages;
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // Function to determine dynamic background based on message length
    const getBackgroundClass = (message: string) => {
        const length = message.length;
        if (length < 50) return 'bg-gray-600';  // Short message
        if (length < 100) return 'bg-gray-600';  // Medium message
        return 'bg-gray-600';  // Long message
    };

    // Auto-scroll to the bottom when new message is added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-screen bg-gray-900">
<SideLayout />
            {/* Chat history */}
            <div
                ref={chatContainerRef}  // Attach the ref to enable scrolling
                className="flex-1 overflow-y-auto p-4 pb-28 flex flex-col items-center justify-start"  // Added bottom padding for visibility
            >
                <div className="max-w-2xl w-full">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-12 flex flex-col items-center">  {/* Increased margin between messages */}
                            {/* User message */}
                            <div className={`w-auto max-w-[90%] p-3 rounded-lg shadow-md bg-gray-600 text-right mb-4 text-gray-200 inline-block break-words`}>
                                <strong>You:</strong> {msg.user}
                            </div>
                            
                            {/* Bot message */}
                            {msg.bot ? (
                                <div
                                    className={`w-auto max-w-[90%] p-3 rounded-lg shadow-md text-gray-200 ${getBackgroundClass(msg.bot)} text-left break-words`}
                                    dangerouslySetInnerHTML={{ __html: msg.bot }}
                                />
                            ) : loading && index === messages.length - 1 && (  // Display loading effect for the last bot message
                                <div className="w-auto max-w-[90%] p-3 rounded-lg shadow-md bg-gray-700 text-left break-words">
                                    <span className="animate-pulse text-white">AI is generating...</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Input section */}
            <div className="w-full fixed bottom-0 left-0 p-4 flex justify-center">
                <div className="flex items-center w-full max-w-2xl  p-4 rounded-lg shadow-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter Your Query..."
                        className="flex-grow px-4 py-2 bg-gray-700 rounded-lg text-white"
                        disabled={!isLoggedIn}
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 p-2 bg-gray-700 hover:bg-gray-900 hover:text-gray-500 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
