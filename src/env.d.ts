/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CLERK_FRONTEND_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
