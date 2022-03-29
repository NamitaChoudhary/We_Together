import { TrafficOutlined } from "@material-ui/icons";

const AuthReducer=(state,action)=>{
    switch(action.type){
     
        case "LOGIN_START":
            return{
                user:null,
                isfetching:TrafficOutlined,
                error:false,
                socket:null
            };
        case "LOGIN_SUCCESS":
            return{
                 user:action.payload,
                 isfetching:false,
                 error:false,
                 socket:null
             };
         case "LOGIN_FAILURE":
             return{
                  user:null,
                  isfetching:false,
                 error:action.payload,
                 socket:null
             };
         case "FOLLOW":
            console.log("hello");
         return{
                ...state,
                user:{
                    ...state.user,
                    following:[...state.user.following,action.payload],

                }
            }
        case "UNFOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    following:state.user.following.filter(
                        following=>following!==action.payload)
                }
            }
        case "SOCKET":
            console.log(action.payload);
            return {
                
                ...state,
                socket:action.payload,
                
            }
            default:
                return state;

    }
     
};

export default AuthReducer;