import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import App from './App';
import RandomWord from './components/RandomWord';
 
export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <main>
                    
                    <Route exact={true} path="/" component={App}/>
                    <Route exact={true} path="/randomWord" component={RandomWord}/>
                </main>
            </div>
        </BrowserRouter>
    );
}