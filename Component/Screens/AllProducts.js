import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity,Modal ,TextInput,ToastAndroid} from 'react-native';



const AllProducts = ({navigation}) => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState([])
  const [searchData, setSearchData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title:'',
    price:'',
    discountPercentage:'',
     rating:'',
     brand:'',
     stock:'',
    category:''
  })

  useEffect(() => {
    axios.get(`https://dummyjson.com/products`)
      .then((res) => {
        // console.log('res', res.data.products)
        setData(res.data.products)
      })
      .catch((err) => console.log('err', err))
  }, [])

  const handleAddProduct =()=>{
    axios.post(`https://dummyjson.com/products/add`,formData)
      .then((res) => {
        console.log('res', res)
        ToastAndroid.show('Product added  successfully',ToastAndroid.SHORT)
        setModalVisible(false)
      })
      .catch((err) => console.log('err', err))
  }

  const handleSearch =()=>{
    axios.get(`https://dummyjson.com/products/search?q=${searchText}`)
    .then((res) => {
      console.log('res', res)
      setSearchData(res.data.products)
      ToastAndroid.show('Product Result',ToastAndroid.SHORT)
    })
    .catch((err) => console.log('err', err))
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{data:item})}} style={styles.item}>
      <Image style={styles.image} source={{ uri: item.thumbnail }} />
      <View>
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );


  console.log(modalVisible)


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
            placeholder='title'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.title} onChangeText={(txt)=>{setFormData({...formData,title:txt})}}/>

          <TextInput
            placeholder='price'
            keyboardType='numeric'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.price} onChangeText={(txt)=>{setFormData({...formData,price:txt})}}/>

          <TextInput
            placeholder='discountPercentage'
            keyboardType='numeric'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.discountPercentage} onChangeText={(txt)=>{setFormData({...formData,discountPercentage:txt})}}/>

            <TextInput
            placeholder='rating'
            keyboardType='numeric'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.rating} onChangeText={(txt)=>{setFormData({...formData,rating:txt})}}/>

          <TextInput
            placeholder='brand'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.brand} onChangeText={(txt)=>{setFormData({...formData,brand:txt})}}/>

          <TextInput
            placeholder='stock'
            keyboardType='numeric'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.stock} onChangeText={(txt)=>{setFormData({...formData,stock:txt})}}/>

          <TextInput
            placeholder='category'
            style={{width:'100%',borderWidth:1,borderColor:'grey',borderRadius:8,marginVertical:2}}
             value={formData.category} onChangeText={(txt)=>{setFormData({...formData,category:txt})}}/>

          <TouchableOpacity onPress={handleAddProduct} style={{backgroundColor:'green',width:'100%',alignItems:'center',justifyContent:'center',borderRadius:10,marginVertical:5,height:35}}>
          <Text style={{color:'white'}}>Add Product</Text>
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
      style={{borderColor:'grey',borderWidth:1.2,width:'70%',alignItems:'center',justifyContent:'center',borderRadius:10,marginVertical:5,marginLeft:10 ,height:45}}/>
      
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  item: {
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  image: {
    width: 280,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 8
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    color: 'green',
  },
  imageStyle: {
    position: 'absolute',
    right: 20, bottom: 20,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AllProducts;
