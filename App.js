import React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, Spinner } from './src/components/commons';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB2gwqNuJvhxtrsq4M8k7f_oD_hn17yEa8',
      authDomain: 'auth-a12e4.firebaseapp.com',
      databaseURL: 'https://auth-a12e4.firebaseio.com',
      projectId: 'auth-a12e4',
      storageBucket: 'auth-a12e4.appspot.com',
      messagingSenderId: '712642286983'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  OnLogout = () => {
    firebase.auth().signOut();
  };
  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return <Button btnText={'Log Out'} pressed={this.OnLogout} />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}
