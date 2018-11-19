import {Card,CardContent,Grid, Typography} from '@material-ui/core';
import * as React from "react"


export default class WordCard extends React.Component<{word:any}>{
    constructor(props:any){
        super(props);
       
        
    }
    
    public render(){
        
        
        return(
            
            <Grid container={true} justify='center'>
                <Grid item={true} xs={8} >
                    <Card>
                        <CardContent>
                        <Typography color="textSecondary">
                            {this.props.word};
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}
