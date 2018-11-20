import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import App from './App';
import DailyWord from './components/DailyWord';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <main>
                    <Route exact={true} path="/" component={App}/>
                    <Route exact={true} path="/dailyWord" component={DailyWord}/>
                </main>
            </div>
        </BrowserRouter>
    );
}