import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import OutlinedInput from '@material-ui/core/OutlinedInput';

interface IState {
    language : any
}

export default class SelectBox extends React.Component<{text:any,language:any,handleChange:any,supportedLanguages: any },IState>{
    constructor(props: any) {
        super(props);
        this.state ={
            language : ""
        }
        
    }
   
    public render() {
        return (
            <div>
                <br/>
                <br/>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-simple">
                        {this.props.text}
                    </InputLabel>
                    <Select
                        style={{width: '200px'}}
                        value={this.props.language}
                        onChange={this.props.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={50}
                                name="Source language"
                                id="outlined-age-simple"
                            />
                        }
                    >
                    {this.props.supportedLanguages.map((name:any,index:any)=>
                        {
                            
                            return <MenuItem value={this.props.supportedLanguages[index]['code']} key={index}>{this.props.supportedLanguages[index]['language']}</MenuItem>
                        }
                    )}
                    </Select>
                </FormControl>
            </div>
        );
    }

   
    
}