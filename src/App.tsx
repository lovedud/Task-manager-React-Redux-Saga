import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import store from './store/store';
import './styles.scss';
import TodoList from './containers/TodoList';
import {VisibilityFilters} from "./types";


export default () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/done">
                    <TodoList filter={"SHOW_COMPLETED"} />
                </Route>
                <Route path="/active">
                    <TodoList filter={"SHOW_ACTIVE"} />
                </Route>
                <Route path="/" component={TodoList}/>
            </Switch>
        </Router>
    </Provider>
);
