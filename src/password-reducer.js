export const types = Object.freeze({
  CLEAR: "clear",
  RESET: "reset",
  CHANGE: "change",
  SUBMIT: "submit",
  VALIDATE: "validate"
});

export const states = Object.freeze({
  IDLE: "idle",
  VALIDATING: "validating",
  ERROR: "idle idle.error",
  SUCESS: "success"
});

export const usePasswordReducer = (state, action) => {
  switch (action.type) {
    case types.CLEAR:
      return {
        ...state,
        password: ""
      };
    case types.RESET:
      return {
        status: states.IDLE,
        password: ""
      };
    case types.CHANGE:
      return {
        status: states.IDLE,
        password: action.payload
      };
    case types.SUBMIT:
      return {
        ...state,
        status: states.VALIDATING
      };
    case types.VALIDATE:
      if (state.password === "password") {
        return {
          ...state,
          status: states.SUCESS
        };
      } else {
        return {
          password: "",
          status: states.ERROR
        };
      }
    default:
      throw new Error("state not accounted for");
  }
};
