import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const chessStore = (set) => ({
    user: {},
    setUser: (userData) => {
        set({ user: { ...userData }, isUserLoggedOut: false })
    },
    isUserLoggedOut: false,
    logout: () => {
        set({ user: {}, isUserLoggedOut: true })
    },
    userStats: {},
    setUserStats: (userData) => {
        set({ userStats: { ...userData } })
    }
})

const useChessStore = create(devtools(persist(chessStore, { name: "user" })))

export default useChessStore;
