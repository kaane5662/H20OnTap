import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, onIdTokenChanged } from "firebase/auth";
import {auth} from "../firebase/config"

export default function Navbar(){
    const navigation = useNavigation()
    const [isAuth, setIsAuth] = useState(false)

    const checkUser = ()=>{
        console.log("heyyy")
        // if(auth.currentUser){
        //     setIsAuth(true)
        // }else{
        //     setIsAuth(false)
        // }
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuth(true)
            }else{
                setIsAuth(false)
            }
        })
    }

    const logOut = ()=>{
        signOut(auth).then(()=>{
            console.log("logged out successfully")
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        checkUser()
    },[])
    
    
    return(
        

        // <View style = {styles.center} >
        //     <TouchableOpacity style = {styles.container}>
        //         <Text style = {styles.icon}>+</Text>
        //     </TouchableOpacity>
        // </View>
        <>
        {isAuth? (
        <View style = {styles.bottom} >
            <TouchableOpacity onPress = {()=> navigation.navigate("Subscribe")} style = {styles.iconContainer}>
            <FontAwesome name = "address-card" color={"white"} size={30}></FontAwesome>
            <Text style = {styles.iconText}>Subscription</Text>  
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=> navigation.navigate("Complain")} style = {styles.iconContainer}>
            <FontAwesome name = "pencil" color={"white"} size={30}></FontAwesome>
            <Text style = {styles.iconText}>Complain</Text>
            </TouchableOpacity>
            {isAuth ? (

                <TouchableOpacity onPress = {logOut} style = {styles.iconContainer}>
                <FontAwesome name = "arrow-right" color={"white"} size={30}></FontAwesome>
                <Text style = {styles.iconText}>Log Out</Text>
                </TouchableOpacity>

            ):(
                <TouchableOpacity onPress = {()=> navigation.navigate("Login")} style = {styles.iconContainer}>
                <FontAwesome name = "user" color={"white"} size={30}></FontAwesome>
                <Text style = {styles.iconText}>Sign In</Text>
                </TouchableOpacity>

            )}
            
        </View>

        ):(
        <View style = {styles.introScreen}>
            <TouchableOpacity onPress={()=> navigation.navigate("Login")} style = {styles.introIconButton}>
                <FontAwesome name="user-circle" color={"white"} size={40}></FontAwesome>
                <Text  style = {styles.introIconText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("SignUp")} style = {styles.introIconButton}>
                <FontAwesome name="user-plus" color={"white"} size={40}></FontAwesome>
                <Text style = {styles.introIconText}>Sign Up</Text>
            </TouchableOpacity>
            
        </View>
        )}
        
        </>
        
    )
}

const styles = StyleSheet.create({
    bottom: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 35,
        paddingVertical: 10,
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: "center",
        zIndex: 0
    },
    top: {
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "row",
        padding: 35,
        justifyContent: "flex-end",
        width: "100%"
    },
    iconContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    iconText: {
        fontSize: 15,
        fontFamily: "Outfit",
        color: "white"
    },
    introScreen: {
        position: "absolute",
        left: 0,
        right: 0,
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        top: 0,
        bottom: 0
    },
    introIconButton: {
        backgroundColor: "rgba(0,0,0,.7)",
        padding: 20,
        width: 150,
        height: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6
    },
    introIconText:{
        fontFamily: "Outfit",
        fontSize: 20,
        color: "white"
    }


})