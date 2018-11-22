import {Button,Card,CardActions,CardContent, Typography, Icon} from '@material-ui/core';
import * as React from "react"


export default class WordCard extends React.Component<{word:any}>{
    constructor(props:any){
        super(props);
       
        
    }
    
    public render(){    
        return(
            <Card style={{ maxWidth: '90%', marginTop:'10px',marginLeft: '5%',height:'30vh',overflow:'auto'}}>
                <CardActions style={{display:'flex',justifyContent:'flex-end'}}>
                  <Button variant="fab">
                    <Icon className="far fa-star"/>
                  </Button>
                </CardActions>
                <CardContent>
                <Typography variant='h3' color="textSecondary" style={{display:'flex',flexDirection:'column',justifyContent:'center',justifyItems:'center',height:'15vh'}}>
                    {this.props.word}  
                </Typography>
                </CardContent>
            </Card>
        )
    }
}
