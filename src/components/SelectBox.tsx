import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import OutlinedInput from '@material-ui/core/OutlinedInput';

interface IState {
    language : any
}

export default class SelectBox extends React.Component<{ supportedLanguages: any },IState>{
    constructor(props: any) {
        super(props);
        this.state ={
            language : ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    private handleChange(event:any) {
        this.setState({ language: event.target.value });
    };
    public render() {
        return (
            <div>
                <br/>
                <br/>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-simple">
                        Source Language
                    </InputLabel>
                    <Select
                        value={this.state.language}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={50}
                                name="Source language"
                                id="outlined-age-simple"
                            />
                        }
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
   
    
}