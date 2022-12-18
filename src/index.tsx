import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import {
  PersistedClient,
  Persister,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { get, set, del } from 'idb-keyval';
import { App } from './App';

const frontendApi = import.meta.env.VITE_APP_CLERK_FRONTEND_API;

/**
 * Creates an Indexed DB persister
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function createIDBPersister(idbValidKey: IDBValidKey = 'tbSpecialist') {
  return {
    persistClient: async (client: PersistedClient) => {
      set(idbValidKey, client);
    },
    restoreClient: async () => {
      const client = await get<PersistedClient>(idbValidKey);
      return client;
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  } as Persister;
}

const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
      retry: false,
    },
  },
});

persistQueryClient({
  persister: createIDBPersister(),
  queryClient,
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider frontendApi={frontendApi}>
        <SignedIn>
          <App />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
