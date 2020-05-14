import { Machine, assign } from "xstate";

const context = {
  password: ""
};

const actions = {
  assignPassword: assign({
    password: (_, event) => event.payload
  }),
  clearPassword: assign({
    password: () => {
      return "";
    }
  })
};

const guards = {
  passwordEntered: ctx => {
    return ctx.password && ctx.password.length;
  }
};

const services = {
  validatePassword: ctx => {
    const toResolveOrNot = (resolve, reject) =>
      ctx.password === "password" ? resolve : reject;
    return new Promise((resolve, reject) =>
      setTimeout(toResolveOrNot(resolve, reject), 2000)
    );
  }
};

export const passwordMachine = onSubmit =>
  Machine(
    {
      id: "passwordMachine",
      initial: "idle",
      context,
      states: {
        idle: {
          entry: "clearPassword",
          on: {
            SUBMIT: { target: "validating", cond: "passwordEntered" },
            CHANGE: {
              target: "idle",
              actions: "assignPassword",
              internal: true // this prevents onEntry from running again
            }
          },
          initial: "normal",
          states: {
            normal: {},
            error: {}
          }
        },
        validating: {
          invoke: {
            src: "validatePassword",
            onDone: { target: "success" },
            onError: { target: "idle.error" }
          }
        },
        success: {}
      },
      on: {
        RESET: ".idle"
      }
    },
    {
      actions,
      services,
      guards
    }
  );
