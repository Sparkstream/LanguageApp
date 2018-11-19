// import { Card, CardContent,Input,Typography } from '@material-ui/core';
import { Input, Grid } from '@material-ui/core';
import * as React from 'react';
import './App.css';
import SimpleCard from './components/WordCard';
import SelectBox from './components/SelectBox';

import logo from './logo.svg';

interface IState {
  text: any,
  translatedWords: any,
  sourceLanguage: any,
  destinationLanguage: any,
  supportedLanguages: any
}

class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      text: "",
      translatedWords: " ",
      sourceLanguage: "",
      destinationLanguage: "",
      supportedLanguages: []
    }
    this.translate = this.translate.bind(this);
    this.getLanguages = this.getLanguages.bind(this);
  }


  public componentDidMount(){
    this.getLanguages();
  }

  public render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Grid container={true} justify='center'>
          <Grid item={true} xs={8} xl={4}>
            <Input placeholder="Enter your text to translate here" onKeyPress={this.translate} fullWidth={true}/>
          </Grid>
        </Grid>
        <SimpleCard word={this.state.text} />
        <SelectBox supportedLanguages={this.state.supportedLanguages}/>
      </div>
    );
  }

  private translate(event: any) {
    if (event.key === "Enter") {
      const fromLang = 'en';
      const toLang = 'zh-CN' // translate to chinese
      const text = event.target.value;
      console.log(text);
      const API_KEY = 'AIzaSyB_tlvFVWZYZuZlF7lGa_IQVoKJ2mUxgYk';

      let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
      url += '&q=' + encodeURI(text);
      url += `&source=${fromLang}`;
      url += `&target=${toLang}`;

      fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: 'POST'
      })
        .then(res => res.json())
        .then((response) => {
          console.log("response from google: ", response);
          this.setState({ text: response.data.translations[0].translatedText });
          /* response.data.translations.forEach((element :any) => {
            this.setState({
              translatedWords : [...this.state.translatedWords,element.translatedText]
            })
          }); */

        })
        .catch(error => {
          console.log("There was an error with the translation request: ", error);
        });
    }
  }
  private getLanguages() {
    const target = 'en';
    const model = 'base' // get all supported Languages of the base model
    const API_KEY = 'AIzaSyB_tlvFVWZYZuZlF7lGa_IQVoKJ2mUxgYk';

    let url = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}`;
    url += `&target=${target}`;
    url += `&model=${model}`;

    fetch(url, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'GET'
    })
      .then(res => res.json())
      .then((response : any) => {
        for(var i =0;i<response.data.languages.length;i++){
          this.setState({
            supportedLanguages : [...this.state.supportedLanguages,response.data.languages[i].name]
          });
        }
        console.log(this.state.supportedLanguages[10]);
        console.log("response from google translate languages: ", response);
        
        /* response.data.translations.forEach((element :any) => {
          this.setState({
            translatedWords : [...this.state.translatedWords,element.translatedText]
          })
        }); */

      })
      .catch(error => {
        console.log("There was an error with the translation request: ", error);
      });
  }
}


export default App;
