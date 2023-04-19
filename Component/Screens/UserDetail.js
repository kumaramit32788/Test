//import liraries
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet,Image, Dimensions ,Text} from 'react-native';
import { Card } from '@rneui/themed';

const {width} =Dimensions.get('window')
// create a component
const UserDetail = ({route}) => {
    const data = route.params.data
    const address = data.address.coordinates
    const {lat,lng}=address
    console.log(lat,lng)



  return (
        <ScrollView  style={{margin:5}}>    
              <View style={{alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'grey',borderRadius:10,marginHorizontal:10}}>
                <Image style={{  width: width*0.8,height:width*0.6, resizeMode:'contain',padding:4}}
                  source={{uri:data.image}} />
            <Text style={{fontSize:20,marginBottom:10,color:'red'}}>{data.firstName +' '+ data.lastName}</Text>
            <Text style={{color:'black',fontSize:18}}>Email: {data.email}</Text>
            <Text style={{color:'black',fontSize:18}}>Gender: {data.gender.toUpperCase()}</Text>
              </View >
              <View style={{alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'grey',borderRadius:10,marginHorizontal:10,marginVertical:10}}>
              <Text style={{color:'black',fontSize:18}}>Personal Information: </Text>
              <Text style={{color:'black',fontSize:18}}>Height: {data.height} </Text>
              <Text style={{color:'black',fontSize:18}}>Weight: {data.weight} </Text>
              <Text style={{color:'black',fontSize:18}}>Eye Color: {data.eyeColor} </Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'grey',borderRadius:10,marginHorizontal:10,marginVertical:10}}>
              <Text style={{color:'black',fontSize:18}}>location </Text>
              <Text style={{color:'black',fontSize:18}}>lat: {lat} </Text>
              <Text style={{color:'black',fontSize:18}}>long: {lng} </Text>
                </View>
                  </ScrollView>
  
  
  );
}

// define your styles
const styles = StyleSheet.create({
  });

//make this component available to the app
export default UserDetail;
