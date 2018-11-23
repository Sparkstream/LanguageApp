import * as React from 'react';
import { Icon, CardActions, Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

interface IState {
    delete: any,
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
            wordList: [],
            delete: false
        }
        this.getFavouriteData = this.getFavouriteData.bind(this);
        this.getLanguagesAvailable = this.getLanguagesAvailable.bind(this);
        this.removeWord = this.removeWord.bind(this);
        this.delete = this.delete.bind(this);
    }

    public componentDidMount() {
        this.getLanguagesAvailable();
    }

    public render() {
        return (
            <div id="page-wrap">
                <div className="App">
                    <Grid container={true} justify='center'>
                        <Grid item={true} xs={8} lg={4}>
                            <Card style={{ maxWidth: '90%', marginLeft: '5%' }}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        <Grid container={true} justify='center'>
                                            {this.state.languagesAvailable.map((name: any, index: any) => {

                                                return <Grid item={true} xs={8} lg={8} key={index} >
                                                    <Button onClick={this.getFavouriteData} value={name}>{name}</Button>
                                                </Grid>

                                            })}
                                        </Grid>
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item={true} xs={8} lg={4}>
                            <Card style={{ maxWidth: '90%', marginLeft: '5%' }}>
                                <CardContent>
                                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="fab" onClick={this.delete}>
                                            <Icon className="fas fa-trash-alt" />
                                        </Button>
                                    </CardActions>
                                    <Typography color="textSecondary">
                                        <Grid container={true} justify='center'>
                                            {this.state.wordList.map((name: any, index: any) => {
                                                return <Grid item={true} xs={8} lg={8} key={index}>
                                                    <Button>
                                                        {name['word']}
                                                    </Button>
                                                    {this.state.delete ?
                                                        <Button onClick={this.removeWord} value={index}>
                                                            <i className="fas fa-minus-circle" />
                                                        </Button>
                                                        : <div />}
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
                    var dict = {};
                    dict['word'] = element.word;
                    dict['id'] = element.id;
                    this.setState({
                        wordList: [...this.state.wordList, dict]
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
    public delete(event: any) {
        this.setState({
            delete: !this.state.delete
        })
    }
    private removeWord(event: any) {
        var index = event.currentTarget.value;
        var id = this.state.wordList[event.currentTarget.value]['id'];
        const url = "https://languageapi.azurewebsites.net/api/languageitems/" + id;

        console.log("The word list is: ", this.state.wordList);
        fetch(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'DELETE'
        }).then((response) => {

            if (response.ok) {

                var array = this.state.wordList;
                array.splice(index, 1);
                this.setState({
                    wordList: array
                });
            }
        })
        .catch(error => {
            console.log("There was an error with the deletion from the database: ", error);
        });
    }
}