import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { URL } from '@/constants'
import { getUserStatsApi } from "@/helper";
import useChessStore from "@/store/useChessStore";


export default function useUserHook() {
    const baseUrl = URL + `/api/v1/stats`

    const { user, setUserStats, userStats } = useChessStore<any>((state) => state)
    console.log("dasdasd", user, setUserStats, userStats)

    const getUserStats = async () => {
        try {
            console.log("user?.loggedInUser?._id", user)
            const response: any = await getUserStatsApi(user?.loggedInUser?._id)
            if (response?.data?.success) {
                setUserStats(response?.data?.response?.result?._doc)
                mutate(baseUrl, response?.data?.response, false);
            } else {
                toast.error('Failed to get user details');
                throw new Error('Failed to get user details');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const { data, error } = useSWR(baseUrl);

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        getUserStats,
        user,
        userStats
    }
}