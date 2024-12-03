import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useState } from "react"
import { db, auth } from "../firebase/config"
import { collection, query, where, getDocs, addDoc, Firestore, limit, updateDoc, doc, setDoc } from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigation } from "@react-navigation/native"

export default function SignUp(){
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const[address, setAddress] = useState("")
    const[zipCode, setZipCode] = useState("")
    const navigation = useNavigation()

    const createAccount = async()=>{
        const addressUpper = address.toUpperCase()
        if(password != confirmPassword) return console.log("Passwords do not match")
        const matchingAddresses = query(collection(db, "homes"), where("address", "==", addressUpper), where("zip_code", "==", zipCode), limit(1))
        const matchingAddressDocs = await getDocs(matchingAddresses)
        if(matchingAddressDocs.docs.length == 0) return console.log("Address is invalid or zip code is invalid")
        const homeData = matchingAddressDocs.docs[0].data()
        createUserWithEmailAndPassword(auth, email, password).then(async (created)=>{   
            console.log(created.user.uid)
            await updateDoc(doc(db,"homes",matchingAddressDocs.docs[0].id), {user: created.user.uid})
            await setDoc(doc(db, "users", created.user.uid), {
                email: created.user.email,
                subscription: 0,
                homes_bin: homeData.bin,
                isAdmin: false,
                sent_subscription: 0    
            })
            
            navigation.navigate("Home")
        }).catch((error)=>{
            console.log(error.message)
        })

        
    }


    return(
        <ScrollView>
       <View style = {styles.container}>
            {/* <TouchableOpacity>

                <FontAwesome style = {{marginBottom: -40}} name="arrow-left" color={"white"} size={40}></FontAwesome>
            </TouchableOpacity> */}
            <Text style = {[{fontSize: 50}, styles.bold, styles.text]}>Sign Up</Text>
            <Text style = {[{fontSize: 25, marginTop: -40}, styles.outfit, styles.text]}>Create your account</Text>
            
            <TextInput onChangeText = {text=>setEmail(text)} placeholder="Email" style = {[styles.inputBox]}></TextInput>
            <TextInput onChangeText = {text => setAddress(text)} placeholder="Address" style = {[styles.inputBox]}></TextInput>
            <TextInput onChangeText = {text => setZipCode(text)} placeholder="ZIP Code" style = {[styles.inputBox]}></TextInput>
            <TextInput onChangeText = {text => setPassword(text)} placeholder="Password" secureTextEntry = {true} style = {[styles.inputBox]}></TextInput>
            <TextInput secureTextEntry = {true} onChangeText = {text => setConfirmPassword(text)} placeholder="Confirm Password" style = {[styles.inputBox]}></TextInput>
            <TouchableOpacity onPress = {createAccount} style = {styles.loginButton}>
                <Text  style = {[{fontSize: 20, color: "white"}, styles.bold, styles.text]}>Sign Up</Text>
            </TouchableOpacity>
            <View style = {[styles.signUp, {marginTop: -20}]}>
                <Text style = {[{fontSize: 17}, styles.outfit, styles.text]}>Already have an account?</Text>
                <TouchableOpacity onPress = {()=> navigation.navigate("Login")}>
                    <Text style = {[{fontSize: 17, color: "#4ecdc4"}, styles.bold]}>Log in</Text>
                </TouchableOpacity>
            </View>
       </View> 
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        display: "flex",
        gap: 30,
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(40,40,40)"
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