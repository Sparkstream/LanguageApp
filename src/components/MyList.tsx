import * as React from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions, Icon } from '@material-ui/core';

export default class MyList extends React.Component<{}>{
    constructor(props: any){
        super(props);
        // this.getMyLanguages = this.getMyLanguages.bind(this);
    }
    public render(){
        return(
            <div id="page-wrap">
                <div className="App">
                    <Grid container={true} justify='center'>
                        <Grid item={true} lg={4} >
                            <Card style={{maxWidth:'90%',marginLeft:'5%'}}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        a
                                    </Typography>
                                </CardContent>
                                <CardActions style={{alignItems:'right'}}>
                                    <Button variant="fab">
                                        <Icon className="far fa-star"/>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item={true} lg={4}>
                            <Card style={{maxWidth:'90%', marginLeft:'5%'}}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        <p>b</p>
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
    /* private getMyLanguages(){

    } */
}