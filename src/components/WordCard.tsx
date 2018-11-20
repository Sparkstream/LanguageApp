import {Card,CardContent, Typography} from '@material-ui/core';
import * as React from "react"


export default class WordCard extends React.Component<{word:any}>{
    constructor(props:any){
        super(props);
       
        
    }
    
    public render(){    
        return(
            <Card style={{ maxWidth: '90%', marginTop:'10px',marginLeft: '5%',height:'30vh',overflow:'auto'}}>
                <CardContent>
                <Typography variant='h1' color="textSecondary" style={{display:'flex',flexDirection:'column',justifyContent:'center',justifyItems:'center',height:'30vh'}}>
                    {this.props.word}
                </Typography>
                </CardContent>
            </Card>
        )
    }
}
