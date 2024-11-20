import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Tasks from "./tasks/pages/Tasks";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/es/zod.json";
import i18next from "i18next";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tasks />
    </QueryClientProvider>
  );
}

export default App;

// lng and resources key depend on your locale.
i18next.init({
  lng: "es",
  resources: {
    es: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);
