import * as React from 'react';
import { CardContent, Grid, Card, Input, Button } from '@material-ui/core';

interface IState {
    register: any
}
export default class Login extends React.Component<{ authenticate: any }, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            register: false
        }
        this.loginUser = this.loginUser.bind(this);
        this.register = this.register.bind(this);
        this.registerPage = this.registerPage.bind(this);
    }
    public render() {
        return (
            <Grid container={true} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', justifyItems: 'center', height: '100vh' }}>
                <Grid item={true} xs={6} md={6}>
                    <Card>
                        <CardContent>
                            {!this.state.register ?
                                <form onSubmit={this.loginUser} >
                                    <div >
                                        <Input name="username" required={true} autoFocus={true} />
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <Input name="password" required={true} type="password" />
                                    </div>

                                    <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                                        <Button name="Login" type="submit" color='primary' variant="contained">Login</Button>
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                                        <Button name="Register" onClick={this.registerPage} color='primary' variant="contained">Register</Button>
                                    </div>
                                    
                                </form>
                                :
                                <form onSubmit={this.register}>
                                    <div >
                                        <Input name="username" required={true} autoFocus={true} />
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <Input name="password" required={true} type="password" />
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                                        <Button name="Register" type="submit" color='primary' variant="contained">Register</Button>
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                                        <Button name="Back" onClick={this.registerPage} color='primary' variant="contained">Back</Button>
                                    </div>
                                </form>
                            }

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }

    private loginUser(event: any) {
        event.preventDefault();
        
        let url = "https://languageapi.azurewebsites.net/api/UserInfo"
        const formData = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        
        fetch(url, {
            body: JSON.stringify(formData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'POST'
        })
            .then((response) => {
                console.log("response from api is: ", response);
                if (response.status == 200) {
                    response.json().then((body: any)=>{
                        console.log("The body is : ",body.id);
                        this.props.authenticate(body.id);
                    })
                    
                    console.log("LOGGED IN");
                }
            })
            .catch(error => {
                console.log("There was an error with the login request: ", error);
            });
        //Call callback function here to change authenticated
        return;
    }

    private register(event: any) {
        event.preventDefault();
        const formData = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        let url = `https://languageapi.azurewebsites.net/api/UserInfo/user`;
        fetch(url, {
            body: JSON.stringify(formData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'POST'
        })
            .then((response) => {
                console.log("response from api is: ", response);
                if (response.status == 200) {
                    console.log("Registered Successfully");
                }
            })
            .catch(error => {
                console.log("There was an error with the login request: ", error);
            });

    }
    private registerPage(event: any) {
        this.setState({
            register: !this.state.register
        })
    }
}