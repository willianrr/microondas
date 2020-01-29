import React, {Component} from 'react';
import './App.css';
import logo from './assets/img/logo.webp'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerStarted: false,
      timerStopped: true,
      minutes: 0,
      seconds:0,
      value: null,
      limited: 0,
      options:1,
    }
  }
  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }
  handleTimerStart(e) {
    e.preventDefault();
    if(this.state.timerStopped) {
    this.timer = setInterval(() => {
      this.setState({timerStarted: true, timerStopped: false});
        if(this.state.timerStarted) {
          if(this.state.limited < 1) {
            this.setState((prevState) => ({seconds: prevState.seconds = 30}));
            this.state.limited = 1
          }else if (this.state.seconds <= 0){
            this.state.timerStopped = true
          }else {
            this.setState((prevState) => ({ seconds: prevState.seconds -1}));
          }
          if(this.state.seconds >= 59) {
            this.setState((prevState) => ({ minutes: prevState.minutes + 1, seconds: -1}));
          }
        }
      }, 1000);
    }
  }
  handleTimerStop(e) {
    e.preventDefault();
    
    this.setState({timeStarted: false, timerStopped: true});
    clearInterval(this.timer);
  }
  handleChange(event) {
    this.setState({value: event.target.value})
    if(this.state.value > 120) {
      this.state.timerStarted = true;
      this.state.minutes = 2
      this.state.seconds = 0
    }
  }
  render() {
    const {value} = this.state
    
  return (
   <main>
     <div className="microondas">
       <div className="wrapper">
         <div className="tampa">
           <div className="efeito-vidro"> </div>
           <div className="cabo"></div>
         </div>
         <div className="menu">
            <div className="tempo">
              {this.state.minutes + ":" + this.state.seconds}
            </div>
            <div className="opcao">
              <h3>Opções</h3>
              <div className="row-cabecalho">
                <button onClick={this.handleTimerStart.bind(this)}>Carne</button>
                <button onClick={this.handleTimerStart.bind(this)}>Frango</button>
                <button onClick={this.handleTimerStart.bind(this)}>Feijao</button>
                <button onClick={this.handleTimerStart.bind(this)}>Peixe</button>
              </div>
            </div>
            <div className="teclado">
              <input 
                className="tempo-valor" 
                placeholder="Digite um valor" 
                type="number"
                maxLength = "3" 
                onInput={this.maxLengthCheck}
                value={value}
                onChange={this.handleChange.bind(this)}
              />
              <div className="row">
                <button onClick={this.handleTimerStop.bind(this)}>C/Pausar</button>
                <button onClick={this.handleTimerStart.bind(this)}>Início</button>
              </div>
            </div>
         </div>
       </div>
       <div className="logo">
         <img className="logo-benner" src={logo} alt="logo benner"/>
       </div>
     </div>
   </main>
  );
}
}

export default App;
