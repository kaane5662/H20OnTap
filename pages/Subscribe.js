import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { db, auth } from "../firebase/config"
import SubscriptionBox from "../components/SubscriptionBox"
import SubscriptonBoxOther from "../components/SubscriptionBoxOther"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useEffect, useState } from "react"
import {collection, query, where, getDocs, limit, updateDoc, getDoc, doc} from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"


export default function Subscribe(){

    const navigation = useNavigation()

    const getCurrentSubscription = async ()=>{
       
        let userDoc = await getDoc(doc(db, "users", auth.currentUser.uid))
        userDoc = userDoc.data()
        setCurrentSubscription(userDoc.subscription) //
        setOriginalSubscription(userDoc.subscription)
    }

    const purchaseCurrentSubscription = async ()=>{
        updateDoc(doc(db, "users", auth.currentUser.uid), {subscription: currentSubscription}).then((response)=>{
            navigation.navigate("Home")
        }).catch((error)=>{
            console.log(error.message)
        })

    }


    useEffect(()=>{
        getCurrentSubscription()
    }, [])

    const [currentSubscription, setCurrentSubscription] = useState()
    const [originalSubscription, setOriginalSubscription] = useState()

    return(
        <ScrollView style = {styles.container}>
            <Text style = {[styles.header_1, styles.text]}>Subscription Plan</Text>
            <Text style = {[styles.header_2, styles.text]}>Choose the subscription plan that best suites your needs</Text>
            <View style = {styles.subscriptionsContainer}>
                <SubscriptonBoxOther select={setCurrentSubscription} planId={1} selection = {currentSubscription} selected={currentSubscription} planDetails={["Pipe Filtration Checks"]} planName={"Basic"} planCost={7.75}></SubscriptonBoxOther>
                <SubscriptonBoxOther select={setCurrentSubscription} planId={2} selection = {currentSubscription} selected={currentSubscription} planDetails={["Pipe Filtration Checks", "Water Tank Checks"]} planName={"Premium"} planCost={9.75}></SubscriptonBoxOther>
                <SubscriptonBoxOther select= {setCurrentSubscription} planId={3} selected={currentSubscription} selection = {currentSubscription} planDetails={["Pipe Filtration Checks", "Water Tank Checks", "Lead PPM Reports"]} planName={"VIP"} planCost={11.75}></SubscriptonBoxOther>
                
                {/* <SubscriptonBoxOther></SubscriptonBoxOther> */}
            </View>
            {
                currentSubscription == originalSubscription || currentSubscription == 0 ? (
                    <TouchableOpacity disabled = {true} style = {[styles.submitButton, {backgroundColor: "rgba(78,205,196,.4)"}]}>
                        <Text onPress = {purchaseCurrentSubscription} style = {styles.submitText} >Continue</Text>
                    </TouchableOpacity>
                ):
                (
                    <TouchableOpacity disabled = {currentSubscription == originalSubscription || currentSubscription == 0} onPress = {purchaseCurrentSubscription} style = {styles.submitButton}>
                        <Text onPress = {purchaseCurrentSubscription} style = {styles.submitText} >Continue</Text>
                    </TouchableOpacity>
                )
            }
            
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40,
        backgroundColor: "black",
        display: "grid",
        gap: 4,

        // alignItems: "center"
    },
    header_1: {
        fontSize: 38,
        fontFamily: "Outfit-Bold",
        textAlign: "center"
        
    },
    header_2: {
        fontSize: 17,
        fontFamily: "Outfit",
        textAlign: "center"
    },
    subscriptionsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginVertical: 20
    },
    submitButton: {
        borderRadius: 20,
        width: "100%",
        height: 70,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#4ecdc4",
        borderColor: "rgba(0,0,0,.2)",
        borderWidth: 2
    },
    submitText: {
        color: "white",
        fontFamily: "Outfit-Bold",
        fontSize: 20
    },
    text:{
        color:"white"
    }
})