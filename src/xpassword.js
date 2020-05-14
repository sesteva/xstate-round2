import React from "react";
import { useMachine } from "@xstate/react";
import { passwordMachine } from "./password-machine";

export const Password = ({ children, submit, disabled, ...rest }) => {
  const machine = passwordMachine(submit);
  const [current, send] = useMachine(machine);

  function _handleSubmit(e) {
    e.preventDefault();
    send("SUBMIT");
  }

  return (
    <form
      id="app"
      className="ui-modal"
      data-state={current.toStrings().join(" ")}
      autoComplete="off"
      onSubmit={_handleSubmit}
    >
      <div className="ui-icon">
        <div className="ui-lock" />
      </div>
      <div className="ui-title">
        XState powered - This link is password-protected
      </div>
      <div className="ui-subtitle">
        <span data-show="idle" data-active={current.matches("idle.normal")}>
          Please enter the password to view this link.
        </span>
        <span
          data-show="validating"
          data-active={current.matches("validating")}
        >
          Validating...
        </span>
        <span
          data-show="idle.error"
          className="ui-error"
          data-active={current.matches("idle.error")}
        >
          Invalid password
        </span>
        <span data-show="success" data-active={current.matches("success")}>
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
          value={current.context.password}
          onChange={e => send({ type: "CHANGE", payload: e.target.value })}
        />
      </div>
      <input className="ui-submit" type="submit" value="Submit" />
      <button
        className="ui-reset"
        type="button"
        title="Reset"
        onClick={() => send("RESET")}
      >
        Reset
      </button>
    </form>
  );
};
