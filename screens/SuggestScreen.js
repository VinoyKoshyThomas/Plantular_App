import React from 'react';
import { Linking, Alert, StyleSheet, Text, View, Button } from 'react-native';

import MenuButton from '../components/MenuButton'

export default class SuggestScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.text}>Suggest</Text>
        <Button
				  onPress={() => Linking.openURL('http://google.com')}
          title="Start"
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
  },
  text: {
    fontSize: 30,
  }
});
