import * as React from 'react';

import { Card, CardContent, Grid, Input, Typography } from '@material-ui/core';
import './App.css';
import SelectBox from './components/SelectBox';
import SimpleCard from './components/WordCard';


interface IState {

  destinationLanguage: any,
  sourceLanguage: any,
  supportedLanguages: any,
  text: any,
  userId : any
}

class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      destinationLanguage: "zh",
      sourceLanguage: "en",
      supportedLanguages: [],
      text: "",
      userId: window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
    }
    this.translate = this.translate.bind(this);
    this.getLanguages = this.getLanguages.bind(this);
    this.handleSource = this.handleSource.bind(this);
    this.handleTarget = this.handleTarget.bind(this);

    this.addFavouriteWord = this.addFavouriteWord.bind(this);
  }


  public componentDidMount() {
    this.getLanguages();
  }

  public render() {

    return (
      <div id="page-wrap">
        <div className="App">
          <Grid container={true} justify='center'>
            <Grid item={true} xs={8} xl={4}>
              <SelectBox text="Source Language" language={this.state.sourceLanguage} handleChange={this.handleSource} supportedLanguages={this.state.supportedLanguages} />
            </Grid>
            <Grid item={true} xs={8} xl={4}>
              <SelectBox text="Destination Language" language={this.state.destinationLanguage} handleChange={this.handleTarget} supportedLanguages={this.state.supportedLanguages} />
            </Grid>
          </Grid>

          <Grid container={true} justify='center'>
            <Grid item={true} xs={8} lg={4} >
              <Card style={{ maxWidth: '90%', marginTop: '10px', marginLeft: '5%', height: '30vh' }}>
                <CardContent>
                  <Typography color="textSecondary">
                    <Input placeholder="Enter your text to translate here" onKeyPress={this.translate} fullWidth={true} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item={true} xs={8} lg={4}>
              <SimpleCard word={this.state.text} addFavouriteWord={this.addFavouriteWord} />
            </Grid>
          </Grid>

        </div>
      </div >
    );
  }

  private translate(event: any) {
    if (event.key === "Enter") {
      const fromLang = this.state.sourceLanguage;
      const toLang = this.state.destinationLanguage; // translate to chinese
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
          console.log("text is ", this.state.text);
          this.setState({ text: response.data.translations[0].translatedText });


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
      .then((response: any) => {
        for (const i of response.data.languages) {
          this.setState({
            supportedLanguages: [...this.state.supportedLanguages, { 'language': i.name, 'code': i.language }]
          });
        }

      })
      .catch(error => {
        console.log("There was an error with the translation request: ", error);
      });
  }

  private handleSource(event: any) {
    this.setState({
      sourceLanguage: event.target.value
    })
  }
  private handleTarget(event: any) {
    this.setState({
      destinationLanguage: event.target.value
    })
  }


  private addFavouriteWord(event: any) {  

    const languageItem = {
      userId : this.state.userId,
      languageCode: this.state.destinationLanguage
    }

    const url = "https://languageapi.azurewebsites.net/api/languageitems";
    for (const i of this.state.supportedLanguages) {
      if (i.code == this.state.destinationLanguage) {
        languageItem['languageName'] = i['language'];
        languageItem['word'] = this.state.text;
      }
    }

    fetch(url, {
      body: JSON.stringify(languageItem),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST'
    })
      .then((response) => {
        console.log(response);
      })
      .catch(error => {
        console.log("There was an error adding your favourite word ", error);
      });
  }
}


export default App;
