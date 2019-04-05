import React from 'react';
import { Button, Image, View } from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  ActivityIndicator,
  Clipboard,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() 
  {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            
          </Text>
        )}

        <Button
          onPress={this._pickImage}
          title="Pick an image"
          color="green"
        />
        <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            
          </Text>
        <Button onPress={this._takePhoto} 
          title="Take a photo"
          color="green"
          />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });
    this.setState({ image: pickerResult['uri'] });
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });

    image = result['base64'];

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    fetch('https://plantular.herokuapp.com/upload__from__mobile__app', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64 : image,
      }),
    }).then((response) => {console.log(response.text());})
      .then((responseJson) => {
        responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
}