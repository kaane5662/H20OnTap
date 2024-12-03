import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"
import backgroundColor from "../Globals"
import { useEffect, useState } from "react"
import { useFonts } from "expo-font";
import StyledText from "./StyledText";
import {db, auth} from "../firebase/config"
import { collection, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";


export default function AdminStatus({marker}){
    const [Customer, setCustomer] = useState()

    const sendServices = async (service)=>{
        console.log("hello")
        if(Customer == null) return console.log("no customer")
        const homesSnap = await getDocs(query(collection(db, "homes"), where("bin", "==", Customer.homes_bin)))
        if(homesSnap.empty) return console.log("No homes bin")
        const customerHomeId = homesSnap.docs[0].id
        await updateDoc(doc(db, "homes", customerHomeId),
        {
            contaminated: false,
            complaint: ""
        })
        await updateDoc(doc(db, "users", marker.user),{
            sent_service: service
        })
        console.log("Updated successfully")
        
    }

    const getUserInfo =async ()=>{
        console.log("Getting dagts")
        
        if(marker.user == null) return
        console.log(marker.user)
        const customerDoc = await getDoc(doc(db, "users", marker?.user))
        console.log(customerDoc.data())
        if(!customerDoc.exists()) return setCustomer(null)
        const customerData = customerDoc.data()
        
        setCustomer(customerData)
    }



    useEffect(()=>{
       getUserInfo()
    },[])
    
    
    return (
        
        

        <View style = {styles.center}>
            

            <View style= {[styles.container, styles.shadowProp]}>
                <View style = {styles.servicesContainer}>
                    <TouchableOpacity onPress={()=>sendServices(1)} disabled = {Customer?.subscription <= 0} style = {[styles.servicesButton, Customer?.subscription <= 0 ? {backgroundColor: "rgba(78,205,196,.4)"}:null]}>
                        <Text style={styles.servicesButtonText}>Pipe Filtration Checks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>sendServices(2)} disabled = {Customer?.subscription <= 1} style = {[styles.servicesButton, Customer?.subscription <= 1 ? {backgroundColor: "rgba(78,205,196,.4)"}:null]}>
                        <Text style={styles.servicesButtonText}>Water Filtration Checks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>sendServices(3)} disabled = {Customer?.subscription <= 2} style = {[styles.servicesButton, Customer?.subscription <= 2 ? {backgroundColor: "rgba(78,205,196,.4)"}:null]}>
                        <Text style={styles.servicesButtonText}>Pipe Filtration + Water +PPM Report</Text>
                    </TouchableOpacity>
                </View>
                <Text style = {[styles.address, styles.bold]}>{marker?.address}</Text>
                <Text style = {[styles.status, styles.blue, styles.bold]}>CONTAMINATED</Text>
                <View style = {styles.information}>
                    <View style = {styles.information_panel}>
                        <Text style = {[styles.information_text, styles.bold]}>{marker?.borough}</Text>
                        <Text style = {styles.information_text}>{marker?.zip_code}</Text>
                    </View>
                    <View style = {styles.information_panel}>
                        <Text style = {[styles.information_text, styles.bold]}>{marker?.neighborhood_tabulation_area_1}</Text>
                        <Text style = {styles.information_text}>{marker?.community_district}</Text>
                    </View>
                </View>
                <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
                />
                <Text style = {[styles.complaint, styles.bold]}>Complaint</Text>
                <Text style = {styles.complaint_text}>{marker?.complaint}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        backgroundColor: "white",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginLeft: "auto",
        marginRight: "auto",   
        width: "100%",
        height: "auto",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 1
    },
    information:{
        display: "flex",
        flexDirection: "row",
        gap: 50,
        paddingVertical: 20,
        justifyContent: "space-between"
    },
    information_panel:{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flexWrap: "wrap",
    },
    address: {
        fontSize: 25,
        fontFamily: "Outfit",

    },
    bold: {
        fontFamily: "Outfit-Bold"
    },
    blue: {
        color: "#4ecdc4"
    },
    status: {
        fontSize: 20,
    },
    information_text: {
        fontSize: 17.5,
        color: "black",
        fontFamily: "Outfit"
    },
    complaint: {
        fontSize: 20,
    },
    complaint_text: {
        fontSize: 17.5,
        fontFamily: "Outfit"
    },
    servicesButton: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#4ecdc4"
    },
    servicesButtonText: {
        fontFamily: "Outfit-Bold",
        fontSize: 17.5,
        color: "white"
    },
    servicesContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingVertical: 20
    }
})