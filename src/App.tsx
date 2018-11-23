import * as React from 'react';

import { Button, Card, CardContent, Grid, Input, Typography } from '@material-ui/core';
import './App.css';
import SelectBox from './components/SelectBox';
import SimpleCard from './components/WordCard';
import MediaStreamRecorder from 'msr';
import * as wordList from './words.json';

interface IState {

  destinationLanguage: any,
  sourceLanguage: any,
  supportedLanguages: any,
  text: any,
  userId: any
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
    this.searchWordByVoice = this.searchWordByVoice.bind(this);
    this.postAudio = this.postAudio.bind(this);
    this.randomizer = this.randomizer.bind(this);
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
                  <Grid container={true}>
                    <Grid item={true} xs={8} lg={8}>
                      <Typography color="textSecondary">
                        <Input id="source-word" placeholder="Enter your text to translate" onKeyPress={this.translate} />
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={4} lg={4}>
                      <Button onClick={this.searchWordByVoice}>
                        <i className="fa fa-microphone" />
                      </Button>
                    </Grid>
                    <Grid item={true} xs={8} lg={8}>
                      <Typography color="textSecondary">
                        <Button onClick={this.randomizer} >
                        
                        <i className="fas fa-question"/>
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
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
      userId: this.state.userId,
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

  private searchWordByVoice() {
    const mediaConstraints = {
      audio: true
    }

    const onMediaSuccess = (stream: any) => {
      const mediaRecorder = new MediaStreamRecorder(stream);
      mediaRecorder.mimeType = 'audio/wav';
      mediaRecorder.ondataavailable = (blob: any) => {
        this.postAudio(blob);
        mediaRecorder.stop()
      }
      mediaRecorder.start(3000);
    }

    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)

    function onMediaError(e: any) {
      console.error('media error', e);
    }
  }

  private postAudio(blob:any){
    let accessToken: any;
    fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
        headers: {
            'Content-Length': '0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
        },
        method: 'POST'
    }).then((response) => {
        // console.log(response.text())
        return response.text()
    }).then((response) => {
        console.log(response)
        accessToken = response
    }).catch((error) => {
        console.log("Error", error)
    });

    // posting audio
    const url = 'https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US';
    fetch(url, {
      body: blob, // this is a .wav audio file    
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer' + accessToken,
          'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
          'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
      },    
      method: 'POST'
    }).then((res) => {
      return res.json()
    }).then((res: any) => {
      const textBox = document.getElementById("source-word") as HTMLInputElement;
      textBox.value = (res.DisplayText as string).slice(0,-1);
      console.log(res)
    }).catch((error) => {
      console.log("Error", error)
    });
  }

  private randomizer() {
    const textBox = document.getElementById("source-word") as HTMLInputElement;
    textBox.value = wordList['data'][Math.floor(Math.random() * wordList['data'].length)]['word']
  }



}


export default App;
