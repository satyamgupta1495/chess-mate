import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { URL } from '@/constants'
import { useNavigate } from "react-router-dom";
import { login } from "@/helper";
import useChessStore from "@/store/useChessStore";

export default function useLoginHook() {
    const baseUrl = URL + `/api/v1/users/login`

    const setUser = useChessStore<any>((state) => state.setUser)

    const navigate = useNavigate()

    const isValidUser = async (data) => {
        try {
            const response: any = await login(data)
            if (response?.data?.success) {
                console.log("response123456", response)
                setUser(response?.data?.response)
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

    console.log("datat123", data, error)

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
        isValidUser,
        navigate
    }
}