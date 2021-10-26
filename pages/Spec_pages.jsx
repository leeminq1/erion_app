import React,{useEffect,useState} from 'react';
import { StyleSheet, View ,Dimensions,TouchableOpacity,Image, Alert,Switch,Thumbnail,SafeAreaView } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label ,Button,Text, Left, } from 'native-base'
import { ButtonGroup } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import * as Animatable from 'react-native-animatable';


const erion_image = require('../assets/loading.png');
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


const Spec_pages = () => {
    const [view,setview]=useState({
        Dimensions:false,
        loading:false,
        time:false,
        weight:false,
        speed:false,
        charge:false
    })

    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
            <Text style={{fontSize:20,paddingTop:Platform.OS === 'ios'?0:10,fontWeight:"bold"}}>e-Rion Specification</Text>
            <Image style={{width:width*0.9,height:Platform.OS === 'ios'?height*0.3:height*0.35,resizeMode:"contain"}} source={erion_image}></Image>
            <Grid style={{width:"100%",height:height*0.45}}>
                <Col size={1}>
                    <Row size={1.5} style={{justifyContent:"center",alignItems:"center",borderWidth:0,borderRadius:15,backgroundColor:"#fbc531",marginBottom:13}}>
                        <Col style={{alignSelf:"center",alignItems:"center"}}>
                            <AntDesign name="layout" size={50} color="black" />
                        </Col>
                        
                        <Col size={1.5} style={{alignSelf:"center",alignItems:"center"}}>
                            <Text style={{fontSize:17,fontWeight:"bold",color:"black"}}>Dimension</Text>
                            <TouchableOpacity onPress={()=>{setview({...view,Dimensions:true})}}>
                            {!view.Dimensions &&  <Text style={{fontSize:12,color:"black",textDecorationLine:"underline"}}>{"\n"}See info</Text>}
                            </TouchableOpacity>
                            {view.Dimensions &&  
                            <>
                            <Text style={{fontSize:12,color:"black"}}>{"\n"}L 920mm</Text>
                            <Text style={{fontSize:12,color:"black"}}>W 650mm</Text>
                            <Text style={{fontSize:12,color:"black"}}>fold</Text>
                            <Text style={{fontSize:12,color:"black"}}>H 250mm</Text>
                            <Text style={{fontSize:12,color:"black"}}>unfold</Text>
                            <Text style={{fontSize:12,color:"black"}}>H 990mm</Text>
                            </>
                            }
                        </Col>
                    </Row>
                    <Row size={1} style={{justifyContent:"center",alignItems:"center",borderWidth:0,borderRadius:15,backgroundColor:"#7ed6df"}}>
                    <Col style={{alignSelf:"center",alignItems:"center"}}>
                        <MaterialCommunityIcons name="truck-delivery-outline" size={50} color="black" />
                        </Col>
                        <Col size={1.5} style={{alignSelf:"center",alignItems:"center"}}>
                            
                            <Text style={{fontSize:12,fontWeight:"bold",color:"black"}}>Time for{"\n"}Loading /Unloading</Text>
                            <TouchableOpacity onPress={()=>{setview({...view,loading:true})}}>
                            {!view.loading &&  <Text style={{fontSize:12,color:"black",textDecorationLine:"underline"}}>{"\n"}See info</Text>}
                            </TouchableOpacity>
                            {view.loading && <Text style={{fontSize:12,color:"black"}}>{"\n"}up to 7 sec.</Text>}
                            
                        </Col>
                    </Row>
                </Col>
                <Col size={1}>
                    <Row size={1} style={{justifyContent:"center",alignItems:"center",borderWidth:0,borderRadius:15,backgroundColor:"#6ab04c"}}>
                        <Col style={{alignSelf:"center",alignItems:"center"}}>
                            <Ionicons name="ios-game-controller-sharp" size={50} color="black" />
                        </Col>
                        
                        <Col size={1.5} style={{alignSelf:"center",alignItems:"center"}}>
                            <Text style={{fontSize:17,fontWeight:"bold",color:"black"}}>Usage Time</Text>
                            <TouchableOpacity onPress={()=>{setview({...view,time:true})}}>
                            {!view.time &&  <Text style={{fontSize:12,color:"black",textDecorationLine:"underline"}}>{"\n"}See info</Text>}
                            </TouchableOpacity>
                            {view.time && <Text style={{fontSize:12,color:"black"}}>{"\n"}2 hours</Text>}
                        </Col>
                    </Row>
                    <Row size={1} style={{justifyContent:"center",alignItems:"center",borderWidth:0,borderRadius:15,backgroundColor:"#f0932b"}}>
                        <Col style={{alignSelf:"center",alignItems:"center"}}>
                            <MaterialCommunityIcons name="scale" size={50} color="black" />
                        </Col>
                        
                        <Col size={1.5} style={{alignSelf:"center",alignItems:"center"}}>
                            <Text style={{fontSize:17,fontWeight:"bold",color:"black"}}>Load Weight</Text>
                            <TouchableOpacity onPress={()=>{setview({...view,weight:true})}}>
                            {!view.weight &&  <Text style={{fontSize:12,color:"black",textDecorationLine:"underline"}}>{"\n"}See info</Text>}
                            </TouchableOpacity>
                            {view.weight && <Text style={{fontSize:12,color:"black"}}>{"\n"}up to 200Kg</Text>}
                        </Col>
                    </Row>
                    <Row size={1} style={{justifyContent:"center",alignItems:"center",borderWidth:0,borderRadius:15,backgroundColor:"#e056fd"}}>
                        <Col style={{alignSelf:"center",alignItems:"center"}}>
                            <SimpleLineIcons name="speedometer" size={50} color="black" />
                        </Col>
                        
                        <Col size={1.5} style={{alignSelf:"center",alignItems:"center"}}>
                            <Text style={{fontSize:17,fontWeight:"bold",color:"black"}}>Max.Speed</Text>
                            <TouchableOpacity onPress={()=>{setview({...view,speed:true})}}>
                            {!view.speed &&  <Text style={{fontSize:12,color:"black",textDecorationLine:"underline"}}>{"\n"}See info</Text>}
                            </TouchableOpacity>
                            {view.speed && <Text style={{fontSize:12,color:"black"}}>{"\n"}1.2 m/s</Text>}
                        </Col>
                    </Row>
                    <Row size={1} style={{justifyContent:"center",alignItems:"center",borderWidth:0,borderRadius:15,backgroundColor:"#c7ecee"}}>
                        <Col style={{alignSelf:"center",alignItems:"center"}}>
                            <Ionicons name="battery-charging-outline" size={50} color="black" />
                        </Col>
                        
                        <Col size={1.5} style={{alignSelf:"center",alignItems:"center"}}>
                            <Text style={{fontSize:17,fontWeight:"bold",color:"black"}}>Charging Time</Text>
                            <TouchableOpacity onPress={()=>{setview({...view,charge:true})}}>
                            {!view.charge &&  <Text style={{fontSize:12,color:"black",textDecorationLine:"underline"}}>{"\n"}See info</Text>}
                            </TouchableOpacity>
                            {view.charge && <Text style={{fontSize:12,color:"black"}}>{"\n"}30 ~ 60 Min.</Text>}
                        </Col>
                    </Row>
                    

                </Col>

            </Grid>
        </Content>
      </Container> 

    )
}

export default Spec_pages

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
      },
      content: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginTop:Platform.OS === 'ios'?0:height*0.05
      },
      title: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
      },
})
