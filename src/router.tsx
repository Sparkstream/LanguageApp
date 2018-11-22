import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import App from './App';
import RandomWord from './components/RandomWord';
import MyList from './components/MyList';
import Login from './components/Login';

interface IState{
    authenticated: any
    userId : any
}

export default class AppRouter extends React.Component<{},IState>  {
    constructor(props:any){
        super(props);
        this.state={
            authenticated:false,
            userId : 0
        }
        this.authenticate = this.authenticate.bind(this);
        
    }
    public render(){
    return (
        
        <BrowserRouter>
            {!this.state.authenticated ? <Login authenticate={this.authenticate}/> :

            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} userId ={this.state.userId}/>
                <main>
                    <Route exact={true} path={"/" + this.state.userId} component={App}/>
                    <Route exact={true} path="/randomWord" component={RandomWord}/>
                    <Route exact={true} path={"/myList/"+ this.state.userId} component={MyList}/>
                    
                </main>
            </div>
            }
        </BrowserRouter>
    );
    }
    private authenticate(userId :any){
        this.setState({
            authenticated : true,
            userId : userId
        });
    }

}