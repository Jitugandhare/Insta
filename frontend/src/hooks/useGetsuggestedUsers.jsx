import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get('https://intsa-backend.onrender.com/user/suggested', { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSuggestedUsers(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSuggestedUsers();
    }, [dispatch]);
};
export default useGetSuggestedUsers;