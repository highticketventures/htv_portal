'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CompanyState {
  currentCompanyId: string | null
  setCurrentCompanyId: (companyId: string | null) => void
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      currentCompanyId: null,
      setCurrentCompanyId: (companyId) => set({ currentCompanyId }),
    }),
    {
      name: 'company-storage',
    }
  )
) 