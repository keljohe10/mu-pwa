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
    retry: 1, // Número de reintentos si la consulta falla
    staleTime: 1000 * 60 * 60 * 24, // Tiempo en milisegundos que los datos se considerarán frescos
    cacheTime: 1000 * 60 * 60 * 24 * 30, // Tiempo en milisegundos que los datos se mantendrán en caché
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
        refetchOnWindowFocus: false, // Evita la actualización cuando la ventana esté enfocada
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
