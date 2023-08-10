'use client'
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const fetchPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!response.ok) {
    throw new Error("An error occurred");
  }
  return response.json();
};

const DashboardContent = () => {
  const { data, isLoading, error } = useQuery("post", fetchPost, {
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, 
    cacheTime: 1000 * 60 * 60 * 24 * 30,
  });

  if (isLoading) return <p>Loading!...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
};

const Dashboard = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
};

export default Dashboard;
