import * as React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
export default class DailyWord extends React.Component<{}>{
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <div id="page-wrap">
                <div className="App">
                    <Grid container={true} justify='center'>
                        <Grid item={true} lg={4} style={{ backgroundColor: 'grey' }}>
                            <Card style={{maxWidth:'90%',marginLeft:'5%'}}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        <p>a</p>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item={true} lg={4} style={{ backgroundColor: 'red' }}>
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

}