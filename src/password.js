import React, { useReducer, useEffect } from "react";
import { usePasswordReducer, types, states } from "./password-reducer";

const initialState = {
  status: states.IDLE,
  password: ""
};

export const Password = ({ children, submit, ...rest }) => {
  const [state, dispatch] = useReducer(usePasswordReducer, initialState);

  function _handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: types.SUBMIT });
    setTimeout(() => {
      dispatch({ type: types.VALIDATE });
    }, 2000);
  }

  useEffect(() => {
    if (state.status === states.SUCCESS) submit(state.password);
    if (state.status === states.ERROR) dispatch({ type: types.CLEAR });
  }, [state.status, state.password, submit]);

  return (
    <form
      id="app"
      className="ui-modal"
      data-state={state.status}
      autoComplete="off"
      onSubmit={_handleSubmit}
    >
      <div className="ui-icon">
        <div className="ui-lock" />
      </div>
      <div className="ui-title">This link is password-protected</div>
      <div className="ui-subtitle">
        <span data-show="idle" data-active={state.status === states.IDLE}>
          Please enter the password to view this link.
        </span>
        <span
          data-show="validating"
          data-active={state.status === states.VALIDATING}
        >
          Validating...
        </span>
        <span
          data-show="idle.error"
          className="ui-error"
          data-active={state.status.includes("idle.error")}
        >
          Invalid password
        </span>
        <span data-show="success" data-active={state.status === states.SUCCESS}>
          <a
            className="ui-link"
            href="https://xstate.js.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            xstate.js.org
          </a>
        </span>
      </div>
      <div className="ui-password">
        <input
          type="password"
          name=""
          id=""
          className="ui-password-input"
          placeholder="the password is password"
          value={state.password}
          onChange={e => dispatch({ type: types.CHANGE, payload: e.target.value })}
        />
      </div>
      <input className="ui-submit" type="submit" value="Submit" />
      <button
        className="ui-reset"
        type="button"
        title="Reset"
        onClick={() => dispatch({ type: types.RESET })}
      >
        Reset
      </button>
    </form>
  );
};
