import * as firebase from 'firebase';
import { Alert, AsyncStorage } from 'react-native';


export async function remote_control(text) {
    try {
      const db = firebase.firestore();
      let userRef = await db.collection('pi').doc("key");
  
      let data = await userRef.get().then((doc) => {
        return doc.data();
      });
      console.log(data["input"])
      await db
        .collection('pi')
        .doc("key")
        .update({input:text});
      return true;
    } catch (err) {
      Alert.alert('Upload err ', err.message);
      return false;
    }
  }

  export async function sel_control_mode(num) {
    try {
      const db = firebase.firestore();
      let userRef = await db.collection('pi').doc("key");
  
      let data = await userRef.get().then((doc) => {
        return doc.data();
      });
      await db
        .collection('pi')
        .doc("key")
        .update({oper:num});
      return true;
    } catch (err) {
      Alert.alert('Upload err ', err.message);
      return false;
    }
  }

  export async function get_property(setproper) {
    try {
      let property_data=[]
      const db = firebase.firestore();
      let userRef = await db.collection('pi').doc("property");
  
      let data = await userRef.get().then((doc) => {

        return doc.data();
      });
      setproper({
        "range":data.range,
        "speed":data.speed
      })
      return data

    } catch (err) {
      Alert.alert('Upload err ', err.message);
      return false;
    }
  }


export async function addLocation(content) {
  try {
    const db = firebase.firestore();
    console.log("db실행")

    await db
      .collection('location')
      .doc(content.date)
      .set(content);
    return true;
  } catch (err) {
    Alert.alert('글 작성에 문제가 있습니다! ', err.message);
    return false;
  }
}

// collection 내에 있는거 전체 가져오기
export async function getLocationData(setMarkers) {
  try {
    let markers_array=[]
    const snapshot = await firebase.firestore().collection('location').get()
    snapshot.docs.map(doc =>{
      markers_array.push(doc.data()) 
      setMarkers(markers_array)
      }
      );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

//location delete
export async function remove_location(date) {
  try {
    const db = firebase.firestore();
    await db
    .collection('location')
    .doc(date)
    .delete();
    console.log("삭제")
    return true;

  } catch (err) {
    console.log(err);
    return false;
  }
}
