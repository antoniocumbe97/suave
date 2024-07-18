import React, { lazy, Suspense } from "react";

import { Spinner } from "./components/Spinner";
import { AuthProvider } from "./context/AuthContext";

import { createRoot } from 'react-dom/client';
const LazyApp = lazy(() => import("./App"));
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <Suspense fallback={<Spinner />}>
      <LazyApp />
    </Suspense>
  </AuthProvider>
);

