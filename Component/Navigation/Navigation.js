//import liraries
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect,useState ,useContext,createContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllProducts from '../Screens/AllProducts';
import AllUsers from '../Screens/AllUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetail from '../Screens/ProductDetail';
import Detail from '../Screens/Detail';
import UserDetail from '../Screens/UserDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export const AuthContext = createContext(null)
const Navigation = () => {
    const [userInfo, setUserInfo] = useState(null)

    const loginInfo =async ()=>{
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            console.log(userInfo)
            userInfo = JSON.parse(userInfo);
      
            if (userInfo) {
              setUserInfo(userInfo);
              console.log('userInfo',userInfo)
            }
          } catch (e) {
            console.log(`is logged in error ${e}`);
          }

    }

    useEffect(()=>{
        loginInfo()
    },[userInfo])

    console.log('ddd',userInfo)
    return (
      <AuthContext.Provider value={{userInfo,setUserInfo}}>
        <NavigationContainer>
          <Stack.Navigator>
            {userInfo == null || userInfo == 'null' ? 
         (<Stack.Group>
           <Stack.Screen name="login" component={Login} options={{ headerShown: false }} /> 
         </Stack.Group>
           ):(
             <Stack.Group>
          <Stack.Screen name="Dashboard" component={MyTabs}  options={{ headerShown: false }} />
          <Stack.Screen name="Products" component={AllProducts}  options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetail" component={ProductDetail}  />
          <Stack.Screen name="Detail" component={Detail}  />
          <Stack.Screen name="UserDetail" component={UserDetail}  />
            </Stack.Group>
          )}
         </Stack.Navigator>
        </NavigationContainer>
          </AuthContext.Provider>
    );
};

function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Products" component={AllProducts}  options={{ headerShown: false }} />
        <Tab.Screen name="Users" component={AllUsers}  options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Navigation;
