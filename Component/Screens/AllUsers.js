//import liraries
import React, { useState, useEffect , useContext } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity,Modal ,TextInput,ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Navigation/Navigation';
import axios from 'axios';



// create a component
const AllUsers = ({navigation}) => {
    const {setUserInfo}=useContext(AuthContext)
    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState([])
    const [searchData, setSearchData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
      })
    
    useEffect(() => {
        axios.get(`https://dummyjson.com/users`)
          .then((res) => {
            console.log('res', res.data.users)
            setData(res.data.users)
          })
          .catch((err) => console.log('err', err))
      }, [])

      const handleAddProduct =()=>{
        axios.post(`https://dummyjson.com/users/add`,formData)
        .then((res) => {
          console.log('res', res)
          ToastAndroid.show('Users added  successfully',ToastAndroid.SHORT)
          setModalVisible(false)
        })
        .catch((err) => console.log('err', err))
      }

      const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>{navigation.navigate('UserDetail',{data:item})}} style={styles.item}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <Text style={styles.firstName}>Name: {item.firstName +' '+item.lastName}</Text>
          <Text style={styles.firstName}>Email: {item.email}</Text>
        </TouchableOpacity>
      );

      const handleSearch =()=>{
        axios.get(`https://dummyjson.com/users/search?q=${searchText}`)
        .then((res) => {
          console.log('res', res)
          setSearchData(res.data.users)
          ToastAndroid.show('Users Result',ToastAndroid.SHORT)
        })
        .catch((err) => console.log('err', err))
      }

    return (
        <View style={styles.container}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            <TextInput
            placeholder='firstName'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.firstName} onChangeText={(txt)=>{setFormData({...formData,firstName:txt})}}/>

          <TextInput
            placeholder='lastName'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.lastName} onChangeText={(txt)=>{setFormData({...formData,lastName:txt})}}/>

                    <TouchableOpacity onPress={handleAddProduct} style={{backgroundColor:'green',width:'100%',alignItems:'center',justifyContent:'center',borderRadius:10,marginVertical:5,height:35}}>
          <Text style={{color:'white'}}>Add User</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}
           style={{backgroundColor:'red',width:'100%',alignItems:'center',justifyContent:'center',borderRadius:10,marginVertical:5,height:35}}>
          <Text style={{color:'white'}}>Cancel</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TextInput value={searchText} onChangeText={(txt)=>setSearchText(txt)} 
                placeholder='Search'
                style={{borderColor:'grey',borderWidth:1.2,width:'70%',alignItems:'center',justifyContent:'center',borderRadius:10,marginVertical:5,marginLeft:10 ,height:45}}
                />
                <TouchableOpacity onPress={handleSearch} style={{backgroundColor:'red',width:'20%',borderRadius:8,justifyContent:'center',alignItems:'center',height:45}}>
                <Text style={{color:'white'}}>Search</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { setModalVisible(true) }} style={styles.imageStyle}>
              <Text style={{color:'white'}}>Add</Text>
            </TouchableOpacity>
            <FlatList
            data={searchData.length == '0'? data:searchData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
      />
            <TouchableOpacity 
            style={{backgroundColor:'red',width:'90%',alignItems:'center',justifyContent:'center' ,borderRadius:10,height:40}} 
            onPress={()=>{ 
                 AsyncStorage.removeItem('userInfo');
             setUserInfo(null)
        }}
            >
                <Text style={{color:'white'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        width:'100%'
        // marginHorizontal:20
    },
    image:{
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
        borderRadius: 100,
    },
    item: {
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        justifyContent:'center',
        alignItems:'center',
        width:'90%'
      },
      imageStyle: {
        position: 'absolute',
        right: 30, bottom: 45,
        backgroundColor: '#0077db',
        zIndex: 1,
        borderRadius: 100,
        padding:15,
        
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});

//make this component available to the app
export default AllUsers;
