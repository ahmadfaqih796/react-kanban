// react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";

import { HelmetProvider } from "react-helmet-async";

// i18n
import "./locales/i18n";
// tailwind css
import "./theme/index.css";

// Membuat klien
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Jumlah percobaan ulang jika gagal
      cacheTime: 300_000, // Masa berlaku cache 5m
      staleTime: 10_1000, // Waktu data menjadi "usang" 10s
      refetchOnWindowFocus: false, // Nonaktifkan pengambilan ulang saat jendela difokuskan
      refetchOnReconnect: false, // Nonaktifkan pengambilan ulang saat menyambung kembali
      refetchOnMount: false, // Nonaktifkan pengambilan ulang saat komponen dipasang
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense>
        {/* <Analytics /> */}
        <App />
      </Suspense>
    </QueryClientProvider>
  </HelmetProvider>
  // </React.StrictMode>
);
