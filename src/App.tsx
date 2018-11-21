import { Card, CardContent, Typography, Input, Grid } from '@material-ui/core';
import * as React from 'react';
import './App.css';
import SimpleCard from './components/WordCard';
import SelectBox from './components/SelectBox';

interface IState {
  text: any,
  sourceLanguage: any,
  destinationLanguage: any,
  supportedLanguages: any
}

class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      text: "",
      sourceLanguage: "en",
      destinationLanguage: "zh",
      supportedLanguages: []
    }
    this.translate = this.translate.bind(this);
    this.getLanguages = this.getLanguages.bind(this);
    this.handleSource = this.handleSource.bind(this);
    this.handleTarget = this.handleTarget.bind(this);
    this.getFavouriteData = this.getFavouriteData.bind(this);
    this.addFavouriteData = this.addFavouriteData.bind(this);
  }


  public componentDidMount() {
    this.getLanguages();
    this.getFavouriteData();
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
              <SimpleCard word={this.state.text} />
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

        for (var i = 0; i < response.data.languages.length; i++) {
          var dict = {};
          dict['language'] = response.data.languages[i].name;
          dict['code'] = response.data.languages[i].language;
          this.setState({
            supportedLanguages: [...this.state.supportedLanguages, dict]

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
  private getFavouriteData() {
    let url = "https://languageapi.azurewebsites.net/api/languageitems/test/0"
    fetch(url, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'GET'
    })
      .then(res => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch(error => {
        console.log("There was an error with the data extraction from database: ", error);
      });
  }

  private addFavouriteData(event: any) {
    let url = "https://languageapi.azurewebsites.net/api/languageitems/";
    fetch(url, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST'
    }).then(res => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch(error => {
        console.log("There was an error with the data extraction from database: ", error);
      });
  }
}


export default App;
