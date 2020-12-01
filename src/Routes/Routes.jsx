import React, { lazy } from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
const Home  = lazy( () => import("../Pages/Home/Home"));
const Test  = lazy( () => import("../Pages/Test/Test"));
const BackOffice = lazy(() => import('../Pages/BackOffice/BackOffice'))
const Error404 = lazy(() => import('../Pages/Error404/Error404'))
const Account = lazy(() => import('../Pages/Account/Account'))
const AlertDialogSlide  = lazy( () => import('../components/ModalLog/ModalLog'));

export default () => (
    <>
        <Switch>
            <Route path="/home">
                <Home />
                <Switch>
                    <Route path="/home" exact />
                    <Route path="/home/login" exact component={AlertDialogSlide} />
                    <Redirect to="/error404" />
                </Switch>
            </Route>
            <Route path="/test">
                <Test />
                <Switch>
                    <Route path="/test" exact />
                    <Route path="/test/login" exact component={AlertDialogSlide} />
                    <Redirect to="/error404" />
                </Switch>
            </Route>
            <PrivateRoute path="/admin">
                <BackOffice />
                <Switch>
                    <Route path="/admin" exact />
                    <Route path="/admin/login" exact component={AlertDialogSlide} />
                    <Redirect to="/error404" />
                </Switch>
            </PrivateRoute>
            <Route path="/account">
                <Account />
                <Switch>
                    <Route path="/account" exact />
                    <Redirect to="/error404" />
                </Switch>
            </Route>
            <Route path="/error404">
                <Error404 />
                <Switch>
                    <Route path="/error404" exact />
                    <Route path="/error404/login" exact component={AlertDialogSlide} />
                    <Redirect to="/error404" />
                </Switch>
            </Route>
            <Redirect exact from="/" to="home" />
            <Redirect to="/error404" />
        </Switch>
    </>

)