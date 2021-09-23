import React,{useEffect,useState} from 'react';
import { StyleSheet, View } from 'react-native';
//파이어베이스 라이브러리 불어오기!
import * as firebase from 'firebase';
//파이어베이스 접속 키값 가져오기
import apiKeys from './config/key';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Loading_pages from './pages/Loading_pages';
import Control_pages from './pages/Control_pages';
// 네비게이션
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigations/TabNavigator';


//파이어베이스 라이브러리가 준비 되면 연결하는 조건문!
if (!firebase.apps.length) {
  console.log('Connected with Firebase');
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const App=()=> {
  const [ready, setReady] = useState(false);


  const loadFont = () => {
    setTimeout(async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setReady(true)
    }, 2500);
  };

  useEffect(() => {
    loadFont();
  }, []);

  return ready ? (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  ) : (
    <Loading_pages />
  );
}

const styles = StyleSheet.create({
});

export default App;