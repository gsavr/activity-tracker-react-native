import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/activityTracker";

const authReducer = (state, action) => {
  switch (action.type) {
    case "authenticated":
      return {
        token: action.payload.token,
        email: action.payload.email,
        errorMessage: "",
      };
    case "authentication_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, email: null, errorMessage: "" };
    default:
      return state;
  }
};

const checkAuth = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const email = await AsyncStorage.getItem("email");
  if (token) {
    dispatch({ type: "authenticated", payload: { token, email } });
  } else {
    dispatch({ type: "signout" });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    //make api request to sign up
    try {
      const response = await trackerApi.post("/signup", { email, password });
      //when signed up, modify state and say we are authenticated
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("email", response.data.email);
      dispatch({ type: "authenticated", payload: response.data });
    } catch (err) {
      //if signing up fails, error message //console.log(err.response.data);
      dispatch({
        type: "authentication_error",
        payload: "Something went wrong, please try again",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    //try to sign in
    try {
      const response = await trackerApi.post("signin", { email, password });
      //handle success by updating state
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("email", response.data.email);
      dispatch({ type: "authenticated", payload: response.data });
    } catch (err) {
      //handle error with message
      dispatch({
        type: "authentication_error",
        payload: "Invalid Credentials",
      });
    }
  };

const signout = (dispatch) => async () => {
  //sign out
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, checkAuth, clearErrorMessage },
  { token: null, email: null, errorMessage: "" }
);
