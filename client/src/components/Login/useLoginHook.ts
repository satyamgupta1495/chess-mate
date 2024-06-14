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

    const loginUser = async (data): Promise<void> => {
        try {
            const response: { data: any } = await login(data);
            if (response.data.success) {
                setUser(response.data.response)
                mutate(baseUrl, response.data.response, false)
                toast.success("Logged in successfully ✔️")
                navigate('/')
            }
        } catch (error: any) {
            toast.error(error?.message);
            console.error('Login error:', error);
        }
    };

    const { data, error } = useSWR(baseUrl);

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
        loginUser,
        navigate
    }
}