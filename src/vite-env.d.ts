/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GIPHY_API_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
