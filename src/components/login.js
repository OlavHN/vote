import { LoginButton } from 'react-native-fbsdk';
import React, { View, Text, PropTypes, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { navigatePush } from '../reducers/navigation'

const Login = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Second Screen</Text>
      <LoginButton
        publishPermissions={["publish_actions"]}
        onLoginFinished={
          (error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              alert("login has finished with permissions: " + result.grantedPermissions)
            }
          }
        }
        onLogoutFinished={() => alert("logout.")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D690CB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 30
  }
})

export default connect(
  state => ({}),
  dispatch => ({
    onButtonPress: () => dispatch(navigatePush('login'))
  })
)(Login)
