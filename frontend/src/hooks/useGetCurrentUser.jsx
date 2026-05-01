import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        console.log(`printing the current user info`);
        const { data } = await axios.get(`${serverUrl}/api/v1/user/me`, {
          withCredentials: true,
        });
        console.log(data);
        dispatch(setUserData(data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
