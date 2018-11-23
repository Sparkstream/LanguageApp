import * as React from 'react';
import { Icon, Input, CardActions, Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import Modal from 'react-responsive-modal';

interface IState {
    delete: any,
    userId: any,
    languagesAvailable: any,
    open: any,
    selectedLanguage: any,
    index: any,
    wordList: any
}
export default class MyList extends React.Component<{}, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            userId: window.location.href.substring(window.location.href.lastIndexOf("/") + 1),
            languagesAvailable: [],
            open: false,
            selectedLanguage: "",
            index: "",
            wordList: [],
            delete: false
        }
        this.getFavouriteData = this.getFavouriteData.bind(this);
        this.getLanguagesAvailable = this.getLanguagesAvailable.bind(this);
        this.removeWord = this.removeWord.bind(this);
        this.delete = this.delete.bind(this);
        this.editRank = this.editRank.bind(this);
    }

    public componentDidMount() {
        this.getLanguagesAvailable();
    }

    public render() {
        const { open } = this.state;
        return (
            <div id="page-wrap">
                <div className="App">
                    <Grid container={true} justify='center'>
                        <Grid item={true} xs={8} xl={4}>
                            <Card style={{ maxWidth: '90%', marginLeft: '5%', marginTop: '20px' }}>
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
                            <Card style={{ maxWidth: '90%', marginLeft: '5%', marginTop: '20px' }}>
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
                                                    <Typography color="textSecondary">
                                                        {name['word']}
                                                    </Typography>


                                                    {this.state.delete ?
                                                        <Button onClick={this.onOpenModal} value={index}>
                                                            <i className="fas fa-edit" />
                                                        </Button>
                                                        : <div />}

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
                    <Modal open={open} onClose={this.onCloseModal}>
                        <form>
                            <div>
                                <label>Language: {this.state.selectedLanguage}</label>
                            </div>
                            <div>
                                <label>Word: {open ? this.state.wordList[this.state.index]['word'] : "No word"}</label>
                            </div>
                            <div>
                                <Input id="rank-value" type="text" placeholder={open? this.state.wordList[this.state.index]['rank']:"No rank"} />
                            </div>
                            <div>
                                <Button onClick={this.editRank}>Save Changes </Button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }

    private getFavouriteData(event: any) {
        const url = "https://languageapi.azurewebsites.net/api/languageitems/" + this.state.userId + "/" + event.currentTarget.value;
        const languageSelected = event.currentTarget.value;
        this.setState({
            selectedLanguage: languageSelected
        });
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
                    dict['rank'] = element.rank;
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
    private onOpenModal = (event: any) => {
        const index = event.currentTarget.value;
        this.setState({
            open: true,
            index: index
        });
    }
    private onCloseModal = () => {

        this.setState({
            open: false
        });
    }
    private editRank(event: any) {
        const rank = document.getElementById('rank-value') as HTMLInputElement
        const languageItem = {
            rank: rank.value,
            userId: this.state.userId,
            id : this.state.wordList[this.state.index]['id'],
            languageName: this.state.selectedLanguage
        }
        const url = "https://languageapi.azurewebsites.net/api/languageitems/";
        console.log(JSON.stringify(languageItem));

        fetch(url, {
            body: JSON.stringify(languageItem),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'PUT'
        }).then((response: any) => {

            if (response.status == 204) {
                alert('rank successfully changed');
                var array = [];
                for (var i = 0; i < this.state.wordList.length; i++) {
                    if (i == this.state.index) {
                        array.push({
                            rank: languageItem['rank'],
                            word: this.state.wordList[i]['word'],
                            id: this.state.wordList[i]['id']
                        })
                    } else {
                        array.push(this.state.wordList[i]);
                    }
                }
                this.setState({
                    wordList:array
                })
            }
        })
            .catch(error => {
                console.log("There was an error with the deletion from the database: ", error);
            });
    }

}