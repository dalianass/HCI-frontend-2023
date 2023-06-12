import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import axios from 'axios';
import { myUrl } from '../helpers/urlHelper';

function RegisterScreen(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");

    const callApi = (fn, ln, email, pass) => {
        const data = {
            firstName: fn,
            lastName: ln,
            email: email,
            password: pass
        };
        axios.post(myUrl + '/users/registerNewUser', data)
        .then(function (response) {
            if(response.status == 201) {
                alert("Uspesno ste se registrovali!");
            }
        })
        .catch(function (error) {
            const errorResponse = error.response;
            
            alert(errorResponse.data.errors[0].message);
        });
    }

    const passwordsMatch = (pass, passRepeated) => {
        if(pass.length > 0 && passRepeated.length > 0) {
            if(pass === passRepeated) {
                return true
            } else {
                return false
            }
        } else 
        return null

    }

    
    return (
            <View style={styles.container}>

                <Image style={styles.logo} source={require("../assets/logo.png")}/>
                <Text style={styles.title}> Registracija:</Text>
                <ScrollView style={styles.scroll}>
                <AppTextInput placeholder="Ime" icon="email"
                onChangeText={text => setFirstName(text)}
                autoCorrect={false} />  

                <AppTextInput placeholder="Prezime" icon="email"
                onChangeText={text => setLastName(text)}
                autoCorrect={false} />   

                <AppTextInput placeholder="Email" icon="email"
                onChangeText={text => setEmail(text)}
                keyboardType="email-address" autoCorrect={false} />  

                <AppTextInput placeholder="Lozinka" icon="lock"
                onChangeText={text => setPassword(text)}
                secureTextEntry autoCorrect={false}/> 

                <AppTextInput placeholder="Ponovite lozinku" icon="lock"
                onChangeText={text => setPasswordRepeated(text)}
                secureTextEntry autoCorrect={false}/>   

                {(passwordsMatch(password, passwordRepeated)) ? null :
                <Text style={styles.errorMsg}>Lozinke se ne poklapaju. Pokusajte ponovo.</Text> 
                }

                <AppButton title="Registruj se" onPress={() => callApi(firstName, lastName, email, password)}/>
                </ScrollView>
            </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        alignItems: 'center',
        borderWidth: 7,
        borderColor: 'red',
    },
    scroll: {
        // flex:1,
        width: '80%',
        borderWidth: 3,
        borderColor: 'green',
        // marginLeft: 55,
        // alignItems: 'center',
        // justifyContent: 'center'

    },
    logo: {
        width:120,
        height: 120,
        alignSelf: 'center',
        marginTop:50,
        marginBottom:30
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
    }
})
export default RegisterScreen;