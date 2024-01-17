import { create } from 'zustand'

interface ActiveHashStore {
  activeHash: string
  setActiveHash: (hash: string) => void
}

export const useActiveHashStore = create<ActiveHashStore>()((set, get) => ({
  activeHash: '',
  setActiveHash: (hash) => set((store) => ({ activeHash: hash })),
}))
