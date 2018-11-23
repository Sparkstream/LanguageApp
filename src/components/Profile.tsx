import * as React from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Input, Button } from '@material-ui/core';

interface IState {
    userId: any,
    username: any,
    edit: any
}
export default class Profile extends React.Component<{}, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            userId: window.location.href.substring(window.location.href.lastIndexOf("/") + 1),
            username: "",
            edit: false
        }
        this.changePassword = this.changePassword.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.editButton = this.editButton.bind(this);
    }
    
    public componentDidMount() {
        this.getUsername();
    }

    public render() {
        return (
            <div id="page-wrap">
                <div className="App">
                    <Grid container={true} justify='center'>
                        <Grid item={true} lg={4}>
                            <Card style={{ maxWidth: '90%', marginLeft: '5%' }}>
                                <CardContent >
                                    <Typography color="textSecondary">
                                        <Grid container={true} justify='center'>
                                            <Grid item={true} lg={8} style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }} >
                                                <Avatar alt="User Profile" style={{ width: 60, height: 60 }} src="https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg" />
                                            </Grid>
                                            <Grid item={true} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <form onSubmit={this.changePassword} >
                                                    <div >
                                                        <Button name="profileUsername">{this.state.username}</Button>
                                                    </div>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Input name="profilePassword" required={true} type="password" />
                                                    </div>
                                                    <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                                                        {this.state.edit ?
                                                            <Button name="Password" type="submit" color='primary' variant="contained">Change password</Button>
                                                            :
                                                            <Button name="Edit" onClick={this.editButton} variant="fab" color="primary" aria-label="edit">
                                                                <i className="fas fa-edit" />
                                                            </Button>}
                                                    </div>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    private changePassword(event: any) {
        event.preventDefault();
        const url = "https://languageapi.azurewebsites.net/api/userinfo/update";
        const userInfo = {
            id: this.state.userId,
            password: event.target.profilePassword.value
        }

        fetch(url, {
            body: JSON.stringify(userInfo),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'PUT'
        })

            .then((response) => {
                console.log(response);
                this.setState({
                    edit: false
                })
                alert('Password changed successfully');
            })
            .catch(error => {
                console.log("There was an error with the data extraction from database: ", error);
            });
    }

    private getUsername() {

        const url = "https://languageapi.azurewebsites.net/api/userinfo/username/" + this.state.userId;
        fetch(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then((response) => {
                console.log(response);
                this.setState({
                    username: response.username
                })
            })
            .catch(error => {
                console.log("There was an error with the data extraction from database: ", error);
            });
    }

    private editButton() {
        this.setState({
            edit: true
        })
    }
}