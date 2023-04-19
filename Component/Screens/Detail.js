//import liraries
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet,Image, Dimensions ,Text} from 'react-native';
import { Card } from '@rneui/themed';

const {width} =Dimensions.get('window')
// create a component
const Detail = ({route}) => {
    const data = route.params.data
    console.log(data)



  return (
    <View style={{}}>
        <ScrollView horizontal style={{margin:5}}>    
        {data.images.map((d)=>{
            return(
            <Image style={{  width: width*0.8,height:width*0.6, resizeMode:'contain',padding:4}}
              source={{uri:d}} />
              )})}
              </ScrollView>
              <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:20,marginBottom:10,color:'red'}}>{data.title}</Text>
           <Text style={{marginBottom:3,color:'green',fontSize:15}}>${data.price}</Text>
            <Text style={{color:'black',fontSize:18}}>{data.discountPercentage}% Discount</Text>
            <Text style={{marginBottom:3,color:'grey',fontSize:15,color:'green'}}>Available Stock: {data.stock}</Text>
            <Text style={{color:'grey'}}>{data.description}</Text>
              </View>
             </View>
  
  
  );
}

// define your styles
const styles = StyleSheet.create({
  });

//make this component available to the app
export default Detail;
