import React from 'react';
import { Linking, Alert, StyleSheet, Text, View, Button } from 'react-native';

 

import MenuButton from '../components/MenuButton'

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.text}>Welcome</Text>
        
        <Button
				onPress={() => this.props.navigation.navigate('Recognize')}
        title="Recognition"
        color="green"
        flex="1"
        />
    

        <Button
				onPress={() => this.props.navigation.navigate('Suggest')}
        title="Suggestion"
        color="green"
        
        />

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  text: {
    fontSize: 30,
  }
});
