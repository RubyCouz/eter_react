import React, { lazy } from "react"
import {Switch, Route, Redirect}from "react-router-dom"

const Home  = lazy( () => import("../Pages/Home/Home"));
const Test  = lazy( () => import("../Pages/Test/Test"));
const BackOffice = lazy(() => import('../Pages/BackOffice/BackOffice'))
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
            <Route path="/admin">
                <BackOffice />
                <Switch>
                    <Route path="/admin" exact />
                    <Route path="/admin/login" exact component={AlertDialogSlide} />
                    <Redirect to="/error404" />
                </Switch>
            </Route>
            <Route path="/error404" exact>
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