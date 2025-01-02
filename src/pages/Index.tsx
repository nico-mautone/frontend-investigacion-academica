import React, { useState } from "react";
import SearchInput from "../components/SearchInput";
import { toast } from "sonner";

interface Message {
  query: string;
  response: any;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSearch = async (query: string) => {
    try {
      console.log("Sending search query:", query);
      const response = await fetch("http://localhost:3000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      console.log("Search response:", data);
      
      // Add new message to history
      setMessages(prev => [{
        query,
        response: data,
        timestamp: new Date()
      }, ...prev]);
      
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="search-container w-full max-w-4xl mx-auto text-center space-y-12">
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight">
          What can I help with?
        </h1>
        
        {/* Message History */}
        {messages.length > 0 && (
          <div className="w-full space-y-4 text-left">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-2 animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">
                    You: {message.query}
                  </p>
                  <p className="text-gray-600">
                    Response: {JSON.stringify(message.response)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <SearchInput onSearch={handleSearch} />
      </div>
    </main>
  );
};

export default Index;