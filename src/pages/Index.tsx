import React from "react";
import SearchInput from "../components/SearchInput";
import { toast } from "sonner";

const Index = () => {
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
        <SearchInput onSearch={handleSearch} />
      </div>
    </main>
  );
};

export default Index;