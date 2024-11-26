import { loginFailure, loginStart, loginSuccess} from './UserRedux'
import axios from 'axios'

export const register=async(dispatch,user) =>{
    dispatch(loginStart());
    try {
        const res=await axios.post("http://localhost:5004/api/auth/register",user)
        dispatch(loginSuccess(res.data));
        console.log(res.data);
    } catch (error) {
        dispatch(loginFailure());
    }
}