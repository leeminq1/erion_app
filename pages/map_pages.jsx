import React, { useState, useEffect, useRef, useMemo} from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicatorBase,
    Image,
    Modal,
    Alert,
    Pressable,
    Animated,TouchableHighlight,
    FlatList,
    RefreshControl
  } from "react-native";
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import * as Location from "expo-location";
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Title,
    CardItem,
    Thumbnail,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Form,
    Item,
    Label,
    Input,
    Spinner,
    SwipeRow,
    Toast
  } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Swipe_scroll from "../components/Swipe_scroll";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons'; 
import {getLocationData,remove_location} from "../config/firebaseFunctions"
// import { markers } from "../mapData";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const ASPECT_RATIO = width / height;
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;  

const map_pages = ({navigation}) => {
    const [markers,setMarkers]=useState([])


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
    
      const [errorMsg, setErrorMsg] = useState(null);
      const [isloading, setisloading] = useState(true);
      const [refreshing, setRefreshing] = React.useState(false);

    
      const map_ref = useRef(null);
      const scrollView_ref = useRef(null);

      const wait = (timeout) => {
        return new Promise((resolve) => {
          setTimeout(resolve, timeout);
        });
      };

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
      
        wait(1500).then(() => {
          setRefreshing(false), getLocationData(setMarkers);
          console.log("refresh")
        });
      }, []);

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
                  getLocationData(setMarkers);
            } catch (ex) {
                console.log("retring....");
            }
            }
            
            setisloading(false);
        })();
        const unsubscribe = navigation.addListener('focus', () => {
          console.log('focus작동함');
          getLocationData(setMarkers);
        });
        return unsubscribe;
      }, []);

      // 지도 움직이는 함수
  const moveMapView = () => {
    map_ref.current.animateToRegion(region, 1000);
    console.log("move_map_view")
  };

  // 지도 animation
  if (map_ref.current) {
    ("지도 animation");
    moveMapView();
  }
  const delete_location= async (data)=>{
    setisloading(true)
    let result = await remove_location(data)
    if (result) {
      Alert.alert('Delete Complete');
      let result_get=getLocationData(setMarkers);
      if(result_get ){
        console.log("동작")
        if(markers.length==1){
          console.log("내부동작")
          setMarkers([])
        }
        
        setisloading(false)
      }
    }

  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      "attention",
      "Do you want to go to that location?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => Alert.alert("Go moving") }
      ]
    );

    const createTwoButtonAlert2 = (data) =>
    Alert.alert(
      "Warning",
      "Delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "warning"
        },
        { text: "OK", onPress: ()=>{delete_location(data)}}
      ]
    );


 
    return isloading ? (
        <Container style={styles.container}>
          <Content
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Spinner color="blue" size={55} />
          </Content>
        </Container>
      ) : (
        <Container style={styles.container}>
            <Header transparent style={styles.header} > 
                    <Text style={styles.font_header}>Location List</Text>       
            </Header>
            
          <Content>
            <MapView.Animated
              ref={map_ref}
              style={{ width: width, height: height * 0.3 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
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
              {markers.map((marker, index) => (
                <Marker
                  coordinate={{
                    latitude: marker.coordinate.latitude,
                    longitude: marker.coordinate.longitude,
                  }}
                  title={marker.title}
                  description={marker.description}
                  key={index}
                  onPress={(e) => {
                  }}>
                 
                </Marker>
              ))}
    
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
                  // console.log(e)
                  setRegion({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                  console.log("region 저장")
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
                radius={100}
                fillColor="rgba(255,255,255,0.5)"></Circle>
            </MapView.Animated>

          </Content>
          <FlatList
          style={{width:width,height:height*0.3}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={()=>{
            return (
              <Grid style={{width:width,height:40,justifyContent:"center",alignItems:"center",backgroundColor:"#f9ca24"}}>
                <Text style={{color:"#eb4d4b",fontWeight:"700"}}>Move anywhere you want to</Text>
              </Grid>
            )
          }}
          data={markers}
          // ListHeaderComponent={() => {
          //   return ;
          // }}
          onEndReachedThreshold={0.1}
          onEndReached={async () => {
            console.log('바닥 가까이 감: 리프레시');
          }}
          renderItem={({item,index}) => {
            // console.log(data);
            return (
              <SwipeRow
              style={{borderWidth:0.5,backgroundColor:"white"}}
              leftOpenValue={75}
              rightOpenValue={-75}
              left={
                <Button success onPress={createTwoButtonAlert}>
                  <Icon active name="md-move" />
                </Button>
              }
              body={
                
                <View style={{flexDirection:"row",justifyContent:"center",width:width,height:height*0.03}}>
                  <Col size={2} style={{justifyContent:"center",alignItems:"center"}}>
                  {item.sel=="red"?<Ionicons name="bookmark" size={24} color="#fc5c65" />:
                       item.sel=="orange"?<Ionicons name="bookmark" size={24} color="#fa8231" />:
                       item.sel=="yellow"?<Ionicons name="bookmark" size={24} color="#fed330" />:
                       <Ionicons name="bookmark" size={24} color="#26de81" />}</Col>
                  <Col size={8}>
                    <TouchableHighlight  
                    underlayColor={"#f0932b"}
                    activeOpacity={0.3}
                    onPress={()=>{
                  console.log("onpress")
                  setRegion(item.coordinate)
              }}>
                  <Text 
                 >{item.title}</Text>
              </TouchableHighlight>
                  </Col>


                </View>
              }
              right={
                <Button danger onPress={()=>{createTwoButtonAlert2(item.date)}}>
                  <Icon active name="trash" />
                </Button>
              }
            />
            );
          }}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />

        </Container>
      );
}

export default map_pages

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
    map: {
        height,
      },
      bubble: {
        backgroundColor: "white",
        borderRadius: 6,
        borderColor: "#ccc",
        borderWidth: 0.5,
        width: 120,
      },
      arrow: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderTopColor: "#fff",
        borderWidth: 16,
        alignSelf: "center",
        marginTop: -32,
      },
      arrowBorder: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderTopColor: "#007a87",
        borderWidth: 16,
        alignSelf: "center",
        marginTop: -0.5,
      },
      ontainer: {
        flex: 1,
      },
      searchBox: {
        position: "absolute",
        marginTop: Platform.OS === "ios" ? 40 : 20,
        flexDirection: "row",
        backgroundColor: "#fff",
        width: "90%",
        alignSelf: "center",
        borderRadius: 5,
        padding: 10,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      },
      chipsScrollView: {
        position: "absolute",
        top: Platform.OS === "ios" ? 90 : 80,
        paddingHorizontal: 10,
      },
      chipsIcon: {
        marginRight: 5,
      },
      chipsItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      },
    
      endPadding: {
        paddingRight: width - CARD_WIDTH,
      },
      card: {
        // padding: 10,
        backgroundColor:"#fff",
        elevation: 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
      },
      cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
      },
      textContent: {
        flex: 2,
        padding: 10,
      },
      cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
      markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
      },
      marker: {
        width: 30,
        height: 30,
      },
      button: {
        alignItems: "center",
        marginTop: 5,
      },
      signIn: {
        width: "100%",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
      },
      textSign: {
        fontSize: 14,
        fontWeight: "bold",
      },  
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
})
