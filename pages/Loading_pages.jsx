import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
const LoadingImage = require('../assets/logo.png');

const Loading_pages = () => {
    return (
        <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Thumbnail style={{width:"90%",height:"60%",resizeMode:"contain",marginLeft:"10%"}} source={LoadingImage}></Thumbnail>
          {/* <Text style={styles.title}>e-Rion Project</Text> */}
        </Content>
      </Container>
    )
}

export default Loading_pages

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3867d6',
    },
    content: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: '700',
      color: '#333',
    },
  });