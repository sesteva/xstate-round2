import React from "react";
import ReactDOM from "react-dom";
import { Password as XPassword } from "./xpassword";
import { Password } from "./password";
import "normalize-css";
import "./styles.css";

function App() {
  const submit = password => {
    console.log("submitting", password);
  };

  return (
    <div>
      <div className="header">
        <h1>React+XState vs React - Exercise 2</h1>
        <p>
          Does using xstate reduce complexity? coding? defects? always? in some
          scenarios? <br />
          Lets see how we can handle a password modal. <br />
          As a reference you can find exercise 1 where we compare Xstate vs
          plain React building a button with transitions{" "}
          <span>
            <a
              href="https://codesandbox.io/s/submitbuttonwithtransitions-zf6u8"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </span>
        </p>
        <h2>Proof of Concept</h2>
        <p>
          Based on{" "}
          <span>
            <a
              href="https://gist.github.com/davidkpiano/e715b59bef817d2146164add26a134b0"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSS state machines by David K Piano{" "}
            </a>
          </span>
          <br />
          The state diagram can be found{" "}
          <span>
            <a
              href="https://xstate.js.org/viz/?gist=f4d1bc6f446c78e63bdefd0d70afd045"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </span>
        </p>
      </div>
      <hr />
      <div className="modals">
        <Password submit={submit} /> <XPassword submit={submit} />
      </div>
      <hr />
      <div className="conclusions">
        <h2>Conclusions</h2>
        <p>
          Note 1: Using CSS to handle states as described in the article is
          powerful. I would say - at least for me - it takes one more thought
          cycle since I now have logic/state in 3 places: tiny part of the JSX
          which is great, core in the machine and now some in the css.
          <br />
          In{" "}
          <span>
            <a
              href="https://codesandbox.io/s/submitbuttonwithtransitions-zf6u8"
              target="_blank"
              rel="noopener noreferrer"
            >
              exercise 1
            </a>
          </span>
          I actually resourced to CSS to handle some states. This was short and
          simple.
          <br />
          In this more complex scenario with animations, I would think for
          someone else coming in and looking at my code, it could present more
          complexity to put the whole picture together.
        </p>
        <p>
          Note 2: useReducer in this case helped me organize the flows. I forced
          the "machine" to a limited set of states by throwing an error on the
          unkown type.
          <br />I did have to fill in with some logic on my component to
          complete the scenarios such as moving from submit to validate and from
          error to clear the password.
          <br />
          The useReducer works and it feels like a draft approach to a state
          machine. It seems to me even if this works I would like to have the
          diagram/design and being able to test my rationalization before I
          coded the component.
        </p>
        <p>
          Note 3: With Xstate the coding was less but as on exercise 1 the
          design and definition consumed more time. Even if both ways take the
          same time, it seems to me with Xstate with come out on the other side
          with some extra stuff such as a design, a way to test our design
          before coding, less logic written by us as we delegate on the library
          and it could help on writting tests as well. This last part I have not
          tried yet.
        </p>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
