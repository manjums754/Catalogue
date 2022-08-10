import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';

 export function Login ({navigation}) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                navigation.navigate('Products');
                console.log("login has error: " , result);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                    navigation.navigate('Products');
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")} />
      </View>
    );
};
