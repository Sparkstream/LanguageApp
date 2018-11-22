import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import App from './App';
import RandomWord from './components/RandomWord';
import MyList from './components/MyList';
import Login from './components/Login';

interface IState{
    authenticated: any

}

export default class AppRouter extends React.Component<{},IState>  {
    constructor(props:any){
        super(props);
        this.state={
            authenticated:false,
        }
        this.authenticate = this.authenticate.bind(this);
        
    }
    public render(){
    return (
        
        <BrowserRouter>
            {!this.state.authenticated ? <Login authenticate={this.authenticate}/> :

            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <main>
                    
                    <Route exact={true} path="/" component={App}/>
                    <Route exact={true} path="/randomWord" component={RandomWord}/>
                    <Route exact={true} path="/mylist" component={MyList}/>
                </main>
            </div>
            }
        </BrowserRouter>
    );
    }
    private authenticate(){
        this.setState({
            authenticated : true
        });
    }

}