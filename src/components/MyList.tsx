import * as React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

interface IState {
    userId: any,
    languagesAvailable: any,
    wordList: any
}
export default class MyList extends React.Component<{}, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            userId: window.location.href.substring(window.location.href.lastIndexOf("/") + 1),
            languagesAvailable: [],
            wordList: []
        }
        this.getFavouriteData = this.getFavouriteData.bind(this);
        this.getLanguagesAvailable = this.getLanguagesAvailable.bind(this);
    }

    public componentDidMount() {
        this.getLanguagesAvailable();
    }

    public render() {
        return (
            <div id="page-wrap">
                <div className="App">
                    <Grid container={true} justify='center'>
                        <Grid item={true} lg={4}>
                            <Card style={{ maxWidth: '90%', marginLeft: '5%' }}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        {this.state.languagesAvailable.map((name: any, index: any) => {
                                            return <Button onClick={this.getFavouriteData} value={name} key={index}>{name}</Button>
                                        })}

                                    </Typography>
                                </CardContent>
                                
                            </Card>
                        </Grid>
                        <Grid item={true} lg={4}>
                            <Card style={{ maxWidth: '90%', marginLeft: '5%' }}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        <Grid container={true} justify='center'>
                                            {this.state.wordList.map((name:any,index:any)=>{
                                                return <Grid item={true} lg={8} key={index}>
                                                    <Button key={index}>
                                                        {name}
                                                    </Button>
                                                </Grid>
                                            })}
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

    private getFavouriteData(event: any) {
        const url = "https://languageapi.azurewebsites.net/api/languageitems/" + this.state.userId + "/" + event.currentTarget.value;
        fetch(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then((response) => {
                this.setState({
                    wordList: []
                })
                response.forEach((element: any) => {
                    this.setState({
                        wordList: [...this.state.wordList, element.word]
                    })
                });

            })
            .catch(error => {
                console.log("There was an error with the data extraction from database: ", error);
            });
    }

    private getLanguagesAvailable() {
        const url = "https://languageapi.azurewebsites.net/api/languageitems/" + this.state.userId + "/getLanguages";
        fetch(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then((response) => {
                console.log("The languages available are :", response);
                this.setState({
                    languagesAvailable: response
                })
            })
            .catch(error => {
                console.log("There was an error with the data extraction from database: ", error);
            });
    }
}