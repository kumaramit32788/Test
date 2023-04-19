//import liraries
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet,Image, Dimensions ,Text} from 'react-native';
import { Card } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign'

const {width} =Dimensions.get('window')
// create a component
const ProductDetail = ({route}) => {
    const data = route.params.data



  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',height:100}}>
        <ScrollView horizontal style={{backgroundColor:'red',flex:2}}>    
        {data.images.map((d)=>{
          return(
            <Image style={{  width: width*0.8, resizeMode:'contain'}}
            source={{uri:d}} />
            )})}
            </ScrollView>
            <Text style={styles.name}>{data.title}</Text>
            <Icon name='upcircle'  size={10}/>
            <Text style={styles.name}>{data.description}</Text>
           <Text style={styles.price}>${data.price}</Text>

             </View>
  
  
  );
}

// define your styles
const styles = StyleSheet.create({
  });

//make this component available to the app
export default ProductDetail;
