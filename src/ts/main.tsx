import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";

import { StateProvider } from "./features/store/StateProvider";
import { reduxStore, appDispatch } from "./app/reduxStore";
import useRedux from "./features/store/useRedux";

// import Home from "./features/pages/Home";
// import LogIn from "./features/pages/Login";
// import OTP from "./features/pages/OTP";
// import Loading from "./features/pages/Loading";

const store = useRedux(reduxStore);
// <StateProvider store={store}>
//   <Router>
//     <Route path="/login" component={LogIn} />
//     <Route path="/otp" component={OTP} />
//     <Route path="/code" component={Home} />
//     <Route path="/" component={Loading} />
//   </Router>
// </StateProvider>
render(
  () => (
    <StateProvider store={store}>
      <Router></Router>
    </StateProvider>
  ),
  // @ts-ignore
  document.getElementById("app"),
);
appDispatch({
  type: "app/didStart",
});
