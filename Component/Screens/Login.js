//import liraries
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet,TextInput,ToastAndroid, Touchable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Navigation/Navigation';

// create a component
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUserInfo,userInfo}=useContext(AuthContext)
    
    const handleClick = (email,password)=>{
        console.log(email =='kminchelle',password =='0lelplR')
        axios.post('https://dummyjson.com/auth/login',
        {'username':email.toString(),'password':password.toString()})
        .then((res)=>{
            console.log('res',res)
            AsyncStorage.setItem('userInfo', JSON.stringify(res.data.token));
            setUserInfo(res.data.token)
            ToastAndroid.show('Loggin Successfully',ToastAndroid.SHORT)
        })
        .catch((err)=>{console.log('err',err)})
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loki Tech</Text>
            <View style={{backgroundColor:'white',width:'90%',margin:5,borderRadius:8,padding:5}}>
        <Text style={{ fontSize: 23, padding: 10, fontFamily: 'Muli-Regular' }}>Login</Text>
        <TextInput
      style={{borderColor:'black',borderWidth:1.5,borderRadius:10,margin:5}}
            value={email}
            onChangeText={(txt) => setEmail(txt)}
            keyboardType='email-address'

            />

        <TextInput
           style={{borderColor:'black',borderWidth:1.5,borderRadius:10,margin:5}}
            value={password}
            onChangeText={(txt) => setPassword(txt)}
            keyboardType='default'
            />
        {/* <Button
            onPress={
                () => {
                    if (!email | !password) {
                        ToastAndroid.show("Null id and Password", ToastAndroid.LONG);
                        
                    } else {
                        // const data = {
                            //     'email': email,
                            //     "password": password,
                            //     "useragent": useragent,
                            //     "uniqueID": uniqueID,
                            //     'attempt': value?.response?.attempt ?? "1"
                            // }
                        }
                    }
                }
                color="#0077db">
                Login
            </Button> */}
        <TouchableOpacity 
        onPress={()=>{
            handleClick(email,password)
        }}
        style={{borderColor:'black',borderWidth:1.5,borderRadius:10,margin:5,color:'white',height:45,justifyContent:'center',alignItems:'center'}}
        >
            <Text>Login</Text>
        </TouchableOpacity>
            </View>
    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0077db',
    },
    title: {
        fontSize: 40,
        color: 'white',
     
    },
});

//make this component available to the app
export default Login;
