import React,{useEffect,useState} from 'react';
import { StyleSheet, View ,Dimensions,TouchableOpacity,Image, Alert,Switch,TextInput,SafeAreaView} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label ,Button,Text, Left, } from 'native-base'
import { ButtonGroup } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { WebView } from 'react-native-webview';
import {remote_control,sel_control_mode,get_property} from '../config/firebaseFunctions'
import { FontAwesome } from '@expo/vector-icons'; 
import RNSpeedometer from 'react-native-speedometer'

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

let timer

const Control_pages = () => {
    

    const buttons = ['Auto', 'Keyboard', 'APP','LIFT']
    const [index,setindex]=useState('')   
    const [Ip_address, setIp_address] = useState('');
    const [Tot_address,setTot_address] = useState('');
    const [control,setControl]=useState(false)
    const [speed,setspeed]=useState(0)
    const [proper,setproper]=useState({
        "range":[0,0,0],"speed":0
    })

    console.log(`contorl value : ${control}`)

    const get_property_timer=()=>{
        timer=setInterval(() => {
            console.log("Interval get firebase")
            get_property(setproper)
    },1000)
}

    const toggleSwitch = () => 
    {if(!control){   
        get_property_timer()
    }else{
        setproper({...proper,speed:0,range:[0,0,0]})
        clearInterval(timer);
        console.log("timer claer")
    }
     control_init()

     setControl(previousState => !previousState);
    // console.log("clear interval")
    // clearInterval(interval) 

}
    
    // useEffect(() => {
    //     control_init()
    // }, [])



    const sel_mode=(index)=>{
        setindex(index)
        sel_control_mode(index)
    }

    
    const control_init=()=>{
        if(remote_control("stop")){
          Alert.alert(control?"Disconnected!":"Connected!")     
        }
    }

    const setDir=(text)=>{
    //   console.log(text)
      remote_control(text)
    }
   
    const change_ip=(Ip_address)=>{
        address=`http://${Ip_address}:8080/?action=stream`
        setTot_address(address)
    }

    const confirm =()=>{
        if (Ip_address == '') {
            setIp_address('IP 주소를 입력해주세요');
            return false;
          } else {
            setIp_address('');
          }
        change_ip(Ip_address)
    }
    console.log(index)
    return (
        <SafeAreaView style={{flex:1}}>
        <Container style={styles.container}>
            <Header transparent style={styles.header} > 
                    <Text style={styles.font_header}>Remote Control</Text>       
            </Header>
            <Content scrollEnabled={false} >
                <Grid style={{marginVertical:0, width:width, height:height,justifyContent:"center",alignItems:"center"}}>
                    <Col style={{height:height}}>
                        <Row size={1.3} style={{marginVertical:0,justifyContent:"center",alignItems:"center"}}>
                            <Col style={{alignItems:"center",justifyContent:"center"}}>
                                <Row size={1} >
                                    <Text style={{fontSize:15}}> Speed (m/sec)</Text> 
                                </Row>
                                <Row size={10}>
                                    <RNSpeedometer labelNoteStyle={{ height: 0, width: 0}}
                                    value={control?proper.speed:0} size={Platform.OS === 'ios' ? 200 : 350} minValue={0} maxValue={5} allowedDecimals={1}/>
                                </Row>
                                <Row size={Platform.OS === 'ios' ? 6 : 1}></Row>
                            </Col>
                        </Row>
                        <Row size={Platform.OS === 'ios' ? 3 : 2}>
                            <Col>
                                <View style={{width:width,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{fontSize:20}}>Left</Text>
                                    <Text style={{marginHorizontal:width*0.16,fontSize:20}}>Center</Text>
                                    <Text style={{fontSize:20}}>Right</Text>
                                </View>
                                <View style={{width:width,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{color:"blue",fontWeight:"700"}}>{control?proper.range[0]:0} m</Text>
                                    <Text style={{marginHorizontal:width*0.2,color:"blue",fontWeight:"700"}}>{control?proper.range[1]:0} m</Text>
                                    <Text style={{color:"blue",fontWeight:"700"}}>{control?proper.range[2]:0} m</Text>
                                </View>

                                <ButtonGroup
                                        buttons={buttons}
                                        containerStyle={{height: 40,width:"90%",alignSelf:"center"}}
                                        buttonContainerStyle={{backgroundColor: '#ffeaa7'}}
                                        textStyle={{color: 'black'}}
                                        style={{alignSelf:"center",justifyContent:"center"}}
                                        selectedIndex={index}
                                        onPress={(index)=>{sel_mode(index)}}
                                    />
                                <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                                    <Text style={{fontSize:13,fontWeight:"500",color:control?"blue":"#d63031"}}>{control?"Control On":"Control Off"}</Text>
                                    <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={control ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={control}
                                    />
                                </View>
                                {control && <Grid style={{width:"60%",justifyContent:"center",alignSelf:"center"}}>
                                    <Col style={{height:height*0.30,marginVertical:20}}>
                                        <Row size={0.5} style={{justifyContent:"center",alignItems:"center"}} >
                                            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{setDir("go")}}>
                                                <Image source={require('../assets/control_up.png')} resizeMode="cover" style={styles.control_image}></Image>
                                            </TouchableOpacity>
                                        </Row>
                                        <Row size={0.5} style={{justifyContent:"space-between",alignItems:"center"}}>
                                            <Col >
                                            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{setDir("left")}}>
                                                    <Image source={require('../assets/control_left.png')} resizeMode="cover" style={styles.control_image}></Image>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col >
                                                <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{setDir("stop")}}>
                                                    <Image source={require('../assets/control_center.png')} resizeMode="cover" style={styles.control_image}></Image>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col >
                                                <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{setDir("right")}}>
                                                    <Image source={require('../assets/control_right.png')} resizeMode="cover" style={styles.control_image}></Image>
                                                </TouchableOpacity>
                                            </Col>
                                        </Row>
                                        <Row size={0.5} style={{justifyContent:"center",alignItems:"center"}} >
                                            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{setDir("back")}}>
                                                <Image source={require('../assets/control_down.png')} resizeMode="cover" style={styles.control_image}></Image>
                                            </TouchableOpacity>
                                        </Row>
                                </Col>
                            </Grid>}
                            </Col>
                        </Row>
                    </Col>
                </Grid>
                {/* <Form style={{alignSelf:"center",width:"90%",height:height*0.15}}>
                    <Item floatingLabel last>
                        <Input placeholder="Raspberry IP" onChangeText={(text)=>{setIp_address(text)}}/>
                    </Item>
                    <Button success style={{width:"100%",marginTop:10,alignItems:"center",justifyContent:"center"}} onPress={confirm} >
                            <Text style={{fontSize:15}}>Confirm</Text>
                    </Button>
                </Form>
                <Grid style={{borderWidth: 1,borderColor:"black",marginTop:15,justifyContent:"center",width:"90%",alignSelf:"center",height:height*0.33}}>
                    <WebView style={{width:"100%"}}
                    source={{uri:Tot_address}}
                    />
                </Grid> */}        
            </Content>
        </Container>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
 container: {
    backgroundColor: 'white',
    },
    content: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginTop:height*0.05
      },
 header:{
     justifyContent:"center",
     alignItems:"center",
     height:height*0.1,
     marginVertical:0
 },
 font_header:{
    fontSize:25,
    fontWeight:"700",
    color:"#4834d4",
 },
 WebView: {
   flex:1,
   width:"100%",
   height:"50%"
  },
  control_image:{
      width:60,
      height:60
  },
  textInput: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    height: 25,
    fontSize: 16,
    marginVertical: 50,
    marginHorizontal: 20,
  },
  labelNote:{
      fontSize:1
  }
})

export default Control_pages
