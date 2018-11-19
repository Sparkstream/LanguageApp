import * as React from 'react';
import './App.css';

import logo from './logo.svg';
interface IState {
  text: any
  translatedWords: any,
}
class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      text : "",
      translatedWords: " "
      
    }
    this.translate = this.translate.bind(this);
  }
  
  public componentDidMount(){
    this.translate();
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
        <p>{this.state.text}</p>
      </div>
    );
  }

  private translate() {
    const fromLang = 'en';
    const toLang = 'zh-CN' // translate to chinese
    const text = 'me';

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
        this.setState({text: response.data.translations[0].translatedText});
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
