import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native"
import { db, auth } from "../firebase/config"
import { useState } from "react"
import {signInWithEmailAndPassword} from "firebase/auth"

export default function Login(){
    const navigation = useNavigation()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const signIn = ()=>{
        signInWithEmailAndPassword(auth, email, password).then(()=>{
            console.log("Login successful")
            navigation.navigate("Home")
        }).catch((error)=>{
            console.log(error.message)
        })
    }


    return(
        
       <View style = {styles.container}>
            {/* <TouchableOpacity onPress = {()=> navigation.navigate("Home")}>

                <FontAwesome style = {{marginBottom: -40}} name="caret-left" color={"white"} size={40}></FontAwesome>
            </TouchableOpacity> */}
            <Text style = {[{fontSize: 50}, styles.bold, styles.text]}>Login</Text>
            <Text style = {[{fontSize: 25, marginTop: -40}, styles.outfit, styles.text]}>Sign in to continue</Text>
            <TextInput placeholder="Email" onChangeText = {text=>setEmail(text)} style = {[styles.inputBox]}></TextInput>
            <TextInput secureTextEntry = {true} placeholder="Password" onChangeText = {text=>setPassword(text)} style = {[styles.inputBox]}></TextInput>
            <TouchableOpacity onPress = {signIn} style = {styles.loginButton}>
                <Text style = {[{fontSize: 20, color: "white"}, styles.bold, styles.text]}>Sign in</Text>
            </TouchableOpacity>
            <View style = {[styles.signUp, {marginTop: -20}]}>
                <Text style = {[{fontSize: 17}, styles.outfit, styles.text]}>Don't have an account?</Text>
                <TouchableOpacity onPress = {()=> navigation.navigate("SignUp")}>
                    <Text style = {[{fontSize: 17, color: "#4ecdc4"}, styles.bold]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
       </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        display: "flex",
        gap: 40,
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(30,30,30)"
    },
    inputBox: {
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        height: 70,
        fontSize: 17,
        fontFamily: "Outfit"
    },
    signUp: {
        display: "flex",
        alignSelf: "center",
        gap: 3,
        flexDirection: "row",
    },
    bold: {
        fontFamily: "Outfit-Bold"
    },
    loginButton: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#4ecdc4",
        width: "100%",
        height: 70,
        alignItems: "center",
        borderRadius: 10
    },
    outfit: {
        fontFamily: "Outfit"
    },
    text: {
        color: "white"
    }

})