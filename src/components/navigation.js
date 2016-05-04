'use strict'

import React, { NavigationExperimental, View, StyleSheet, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import { navigatePush, navigatePop } from '../reducers/navigation'
import Login from './login';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Header: NavigationHeader
} = NavigationExperimental

class Navigation extends React.Component {

  render() {
    let { navigationState, onNavigate, onBack } = this.props

    return (
      <NavigationAnimatedView
        navigationState={navigationState}
        style={styles.outerContainer}
        onNavigate={action => {
          if (action.type === 'back') {
            onBack()
          }
        }}
        renderOverlay={props => (
          <NavigationHeader
            {...props}
            renderTitleComponent = {props => {
              const title = props.scene.navigationState.title;
              return <NavigationHeader.Title>{title}</NavigationHeader.Title>
            }}
          />
        )}
        renderScene={props => (
          <NavigationCard
            {...props}
            key={props.scene.navigationState.key}
            renderScene={this._renderScene} />
        )}
      />
    )
  }

  _renderScene({scene}) {
    const { navigationState } = scene;

    switch(navigationState.key) {
      case 'login':
        return <Login />
      /*case 'CardList':
        return <CardList />
      case 'Second':
        return <Second />
      case 'Third':
        return <Third />*/
    }
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  container: {
    flex: 1
  }
})

export default connect(
  state => ({
    navigationState: state.navigationState
  }),
  dispatch => ({
    onNavigate: (destState) => dispatch(navigatePush(destState)),
    onBack: () => dispatch(navigatePop())
  })
)(Navigation)
