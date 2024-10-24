// Extende a interface Window
declare global {
  interface Window {
    mutationObserverListeners?: MutationObserver[];
  }
}

// Para que TypeScript reconheça este arquivo como um módulo
export {};