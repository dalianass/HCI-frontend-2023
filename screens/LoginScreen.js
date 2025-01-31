import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import axios from 'axios';
import { myUrl } from '../helpers/urlHelper';
import { AuthContext } from '../context/AuthContext';

function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        isValidUser: true,
        isValidPassword: true
    });

    const {login} = useContext(AuthContext);

    const handleValidUser = (val) => {
        if(val.trim().length >=4) {
            setFormData({...formData, isValidUser: true});
        } else {
            setFormData({...formData, isValidUser: false})
        }
    }

    const handleValidPassword = (val) => {
        if(val.trim().length >=6) {
            setFormData({...formData, isValidPassword: true});
        } else {
            setFormData({...formData, isValidPassword: false})
        }
    }

    return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImg} source={require("../assets/2.png")}>
                    <Image style={styles.logo} source={require("../assets/logo.png")}/>
                    <View style={styles.wrap}>
                        <Text style={styles.title}> Ulogujte se:</Text>

                        <AppTextInput placeholder="Email" icon="email"
                        onChangeText={text => {setEmail(text); handleValidUser(text)}}
                        keyboardType="email-address" autoCorrect={false} 
                        />
                        {formData.isValidUser ? null :
                        <Text style={styles.errorMsg}>Email ne sme biti kraci od 4 cifre.</Text> 
                        }

                        <AppTextInput placeholder="Password" icon="lock"
                        onChangeText={text => {setPassword(text); handleValidPassword(text)}}
                        secureTextEntry autoCorrect={false}
                        />
                        {formData.isValidPassword ? null :
                        <Text style={styles.errorMsg}>Password mora sadrzati najmanje 6 karaktera!</Text>
                        }     

                        <AppButton title="Login" onPress={() =>  {
                                    // login(email, password);
                                    login(email, password) ? navigation.navigate("Default") : null
                                }}
                        />

                    </View>
                    
                    {/* <Text>{test}</Text> */}
                </ImageBackground>
            </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width:'100%',
        height:'100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        width:120,
        height: 120,
        alignSelf: 'center',
        marginTop:50,
        marginBottom:30,
        resizeMode: 'contain'
    },
    title: {
        fontSize:24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#045346'
    },
    errorMsg: {
        color: 'red',
        // backgroundColor: '#f78a8a',
        paddingHorizontal: 15
    },
    wrap: {
        width: '90%',
        alignItems:'center'
    }
})
export default LoginScreen;