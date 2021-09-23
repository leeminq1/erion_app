import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Text,
  Button,
  Thumbnail,
  Item,
  Input,
  Form,
  Textarea,
  Spinner,
  ListItem,
} from 'native-base';
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { ButtonGroup } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {addLocation} from "../config/firebaseFunctions"

const loading = require('../assets/loading.gif');

import * as firebase from 'firebase';
import 'firebase/firestore';
import { TouchableOpacity } from 'react-native';



const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const ASPECT_RATIO = width / height;
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;  

export default function AddPage() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const component1 = () => <View style={{backgroundColor:"#fc5c65",width:"100%",height:"100%"}} ></View>;
  const component2 = () => <View style={{backgroundColor:"#fa8231",width:"100%",height:"100%"}} ></View>;
  const component3 = () => <View style={{backgroundColor:"#fed330",width:"100%",height:"100%"}} ></View>;
  const component4 = () => <View style={{backgroundColor:"#26de81",width:"100%",height:"100%"}} ></View>;
  const buttons = [{ element: component1 }, { element: component2 },{ element: component3 }, { element: component4 }]
  const [index,setindex]=useState('')

  const [progress, setProgress] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isloading, setisloading] = useState(true);

  const [location, setLocation] = useState({
    latitude: 37.4822971,
    longitude: 126.9030901,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [region, setRegion] = useState({
    name: "장소를 선택해주세요",
    address: "장소를 선택해주세요",
    latitude: 37.4822971,
    longitude: 126.9030901,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const onMarkerPress = (mapEventData) => {
    // console.log(mapEventData)
    console.log("onMaker")

  };
  const sel_mode=(index)=>{
    setindex(index)
}


  const upload = async () => {
    if(title==''){
      Alert.alert("Please enter title")
      return false;
    }
    console.log('업로드 준비중!');
    setProgress(true);
    let date = new Date();
    let getTime = date.getTime();
    let data = {
      title: title,
      coordinate: region,
      date: getTime.toFixed(3),
      sel:index==0?"red":
      index==1?"orange":
      index==2?"yellow":"green"
     }
    ;
    let result = await addLocation(data);
    if (result) {
      Alert.alert('Success');
      setTitle('');
      setProgress(false);
    } else {
      Alert.alert('Fail');
      setProgress(false);
    }
  };

  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert(errorMsg);
        return;
      }
      let locationSuccess = false;
        while (!locationSuccess) {
        try {
            let { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
            });
            locationSuccess = true;
            console.log("set map loading")
            setLocation({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
              setRegion({
                name: "장소를 선택해주세요",
                address: "장소를 선택해주세요",
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
        } catch (ex) {
            console.log("retring....");
        }
        }
        setisloading(false);
    })();
  }, []);

  return (
    isloading ? (
      <Container style={styles.container}>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Spinner color="blue" size={55} />
        </Content>
      </Container>):(
    <Container style={styles.container}>
      {progress == false ? null : (
        <Spinner color="blue" size={60} style={styles.progress} />
      )}
            <Header transparent style={styles.header} > 
                    <Text style={styles.font_header}>Location Register</Text>       
            </Header>
      <Content>
      <MapView.Animated
              style={{ width: width, height: height * 0.4 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              //region={region}
              showsUserLocation={true}
              onRegionChange={() => {
                // console.log("지도움직이는중");
                // console.log(region);
                // setLocation({
                //   latitude: region.latitude,
                //   longitude: region.longitude,
                // });
              }}
              onRegionChangeComplete={() => {
                // console.log("지도움직이는것 멈춤");
              }}
              provider="google">
                              <Marker.Animated
                style={{ zIndex: 3 }}
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                title={"선택위치"}
                draggable={true}
                onDragStart={(e) => {}}
                onDragEnd={(e) => {
                  console.log("drag끝");
                  setRegion({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  });
                }}
                pinColor="navy">
                <Callout tooltip>
                  <View>
                    <View style={styles.bubble}>
                      <Text style={{ textAlign: "center" }}>{region.name}</Text>
                    </View>
                  </View>
                </Callout>
              </Marker.Animated>
              <Circle
                center={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                radius={500}
                fillColor="rgba(255,255,255,0.5)"></Circle>
        </MapView.Animated>
        <Grid style={{justifyContent:"center",alignItems:"center",height:height*0.15,marginTop:height*0.03}} >
          <Col >
            <Row size={1} style={{justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:20,fontWeight:"700",color:"#4b7bec"}}>
            Please select a category
            </Text>
        </Row>
        <Row size={2} style={{justifyContent:"center"}}>
        <ButtonGroup
            buttons={buttons}
            containerStyle={{height: 40,width:"90%",alignSelf:"center",justifyContent:"center"}}
            buttonContainerStyle={{backgroundColor:"white"}}
            textStyle={{color: 'red'}}
            style={{alignSelf:"center",justifyContent:"center"}}
            selectedIndex={index}
            onPress={(index)=>{
              sel_mode(index)}}
            selectedButtonStyle={{borderWidth:4,backgroundColor:"#dff9fb"}}
            buttonStyle={{
            }}
            
            />    
            </Row>
            </Col>  
        </Grid>

      
        <Item regular style={styles.title}>
          <Input
            placeholder="Location title"
            style={{ fontSize: 13 }}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </Item>
        <Button full style={styles.uploadButton} onPress={() => upload()}>
          <Text>등록</Text>
        </Button>
      </Content>
    </Container>)
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  }, header:{
    justifyContent:"center",
    alignItems:"center",
    height:Platform.OS === 'ios'?height*0.05:height*0.1,
    marginVertical:0
},
font_header:{
   fontSize:25,
   fontWeight:"700",
   color:"#4834d4",
},
  imageUpload: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    borderStyle: 'dashed',
    width: '90%',
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    borderRadius: 10,
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageUploadPlus: {
    textAlign: 'center',
    width: '100%',
    fontSize: 90,
    fontWeight: '300',
    color: 'grey',
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  contentLayout: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  content: { borderRadius: 10, fontSize: 13 },
  uploadButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#686de0',
  },
  progress: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 2,
  }
});
