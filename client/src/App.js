import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"
import SignMessagePage from "./pages/SignMessagePage"
import { Route } from "react-router-dom";


function App() {
    return (
        <div className="App">
            <Route path="/reg">
                <SignUpPage />
            </Route>
            <Route path="/auth">
                <SignInPage />
            </Route>
            <Route path="/main">
                <MainPage/>
            </Route>
            <Route path="/" exact>
                <MainPage/>
            </Route>
            <Route path="/reg-message" exact>
                <SignMessagePage/>
            </Route>
        </div>
    );
}

export default App;
