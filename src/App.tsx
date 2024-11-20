import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Tasks from "./tasks/pages/Tasks";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tasks />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
