import { BrowserRouter, Route, Switch } from "react-router-dom";
import RequestsPage from "./pages/RequestsPage";



const Router = () => {
    return (
        <BrowserRouter>
        <Switch>
        <Route path="/login" element={<Login />} />
        </Switch>
        </BrowserRouter>
    );

}


export default Router;