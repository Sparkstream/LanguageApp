import {Card,CardContent, Typography} from '@material-ui/core';
import * as React from "react"


export default class WordCard extends React.Component<{word:any}>{
    constructor(props:any){
        super(props);
       
        
    }
    
    public render(){    
        return(
            
            <Card style={{ maxWidth: '90%', marginTop:'10px',marginLeft: '5%',height:'30vh'}}>
                <CardContent>
                <Typography color="textSecondary">
                    {this.props.word}
                </Typography>
                </CardContent>
            </Card>
               
        )
    }
}
