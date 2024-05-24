import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const chessStore = (set) => ({
    user: {},
    setUser: (userData) => {
        set({ user: { ...userData } })
    },
    isUserLoggedOut: false,
    logout: () => {
        set({ user: {}, isUserLoggedOut: true })
    }
})

const useChessStore = create(devtools(persist(chessStore, { name: "user" })))

export default useChessStore;
