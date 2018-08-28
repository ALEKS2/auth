import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './commons';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };
  pressed = () => {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(() => {
            this.setState({ error: 'Authentication failed', loading: false });
          });
      });
  };
  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  };
  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button btnText={'Login'} pressed={this.pressed} />;
  };
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            value={this.state.email}
            changed={text => this.setState({ email: text })}
            label={'Email'}
            placeholder={'username@gmail.com'}
            secureText={false}
          />
        </CardSection>
        <CardSection>
          <Input
            value={this.state.password}
            changed={text => this.setState({ password: text })}
            label={'Password'}
            placeholder={'Password'}
            secureText={true}
          />
        </CardSection>
        <Text style={styles.errorStyle}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
};
export default LoginForm;
