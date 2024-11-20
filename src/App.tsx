import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Tasks from "./tasks/pages/Tasks";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tasks />
    </QueryClientProvider>
  );
}

export default App;
