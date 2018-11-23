import * as React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import * as wordList from '../words.json';

interface IState {
    word: any
}
export default class RandomWord extends React.Component<{}, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            word: ""
        }
        this.randomizer = this.randomizer.bind(this);
    }
    public componentDidMount() {
        this.randomizer();
    }
    public render() {
        return (
            <div id="page-wrap">
                <div className="App">
                    <Grid container={true} justify='center'>
                        <Grid item={true} lg={12} xs={12} style={{paddingTop:'40vh'}} >
                            <Card style={{ maxWidth: '90%', marginLeft: '5%' }}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        {this.state.word}
                                    </Typography>
                                </CardContent>
                                <Button onClick={this.randomizer} >
                                    <Typography color="textSecondary">
                                        Get a random word!
                                    </Typography>

                                </Button>
                            </Card>
                        </Grid>

                    </Grid>
                </div>
            </div>
        );
    }
    private randomizer() {
        this.setState({ word: wordList['data'][Math.floor(Math.random() * wordList['data'].length)]['word'] });

    }
}