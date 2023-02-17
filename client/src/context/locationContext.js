import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "update_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return {
        ...state,
        recording: true,
        isTimerActive: true,
        isTimerPaused: false,
      };
    case "stop_recording":
      return { ...state, recording: false, isTimerPaused: true };
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "add_activity_name":
      return { ...state, name: action.payload };
    case "add_time_stamp":
      return { ...state, timeStamp: action.payload };
    case "reset":
      return {
        ...state,
        name: "",
        locations: [],
        timeStamp: "",
        isTimerActive: false,
        //timer: 0,
      };
    /*  case "update_time":
      return { ...state, timer: action.payload }; */
    default:
      return state;
  }
};

const resetTrack = (dispatch) => () => {
  dispatch({ type: "reset" });
};

const activityName = (dispatch) => (name) => {
  dispatch({ type: "add_activity_name", payload: name });
};

const startRecording = (dispatch) => (timeStamp) => {
  dispatch({ type: "start_recording" });
  dispatch({ type: "add_time_stamp", payload: timeStamp });
};

const stopRecording = (dispatch) => (timeStamp) => {
  dispatch({ type: "stop_recording" });
  dispatch({ type: "add_time_stamp", payload: timeStamp });
};

const updateLocation = (dispatch) => (location, recording) => {
  dispatch({ type: "update_current_location", payload: location });
  if (recording) {
    dispatch({ type: "add_location", payload: location });
  }
};

/* const updateTimer = (dispatch) => (timer) => {
  dispatch({ type: "update_time", payload: timer });
}; */

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    startRecording,
    stopRecording,
    updateLocation,
    activityName,
    resetTrack,
    /* updateTimer */
  },
  {
    recording: false,
    locations: [],
    currentLocation: null,
    name: "",
    timeStamp: "",
    isTimerActive: false,
    isTimerPaused: true,
    /* timer: 0, */
  }
);
