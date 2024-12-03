import { useEffect, useState } from "react";
import { View, TextInput, Text, TextInputBase, StyleSheet, TouchableOpacity} from "react-native";
import {getDoc, updateDoc, addDoc, query, collection, where, getDocs, doc} from "firebase/firestore"
import {db, auth} from "../firebase/config"


export default function Complain(){
    const [binCode, setBinCode] = useState("")
    const [complaint, setComplaint] = useState("")
    const [message, setMessage] = useState("")

    const [User, setUser] = useState({})

    const createContaminationComplaint = async ()=>{
        
        if(User == null) return
        const binExists = await getDocs(query(collection(db, "homes"), where("bin","==",User.homes_bin)))
        if(binExists.empty) return
        const binExistsId = binExists.docs[0].id
        await updateDoc(doc(db, "homes", binExistsId), {
            complaint,
            contaminated: true
        })
    }

    const getCurrentUserComplaint = async ()=>{
        setUser(null)
        let userDoc = await getDoc(doc(db,"users",auth.currentUser.uid))
        if(!userDoc.exists()) return
        userDoc = userDoc.data()
        setUser(userDoc)
        const querySnapshot = await getDocs(query(collection(db, "homes"), where("bin","==",userDoc.homes_bin)))
        if(querySnapshot.empty) return
        console.log(querySnapshot.docs[0].data())
        setComplaint(querySnapshot.docs[0].data().complaint)
    }



    useEffect(()=>{
        getCurrentUserComplaint()
    },[])
    const [toggle, setToggle] = useState(false)
    return(
        <>
            
            
            <View style = {styles.container}>
                
                {/* <TextInput placeholder="BIN Number">BIN</TextInput> */}
                
                <Text style = {styles.reportText}>Report</Text>
                <Text style = {{fontFamily: "Outfit", fontSize: 17, textAlign: "center", color: "white"}}>Write a report to help identify the best services needed</Text>
                {/* <Text style = {styles.messageText}>{message}</Text>
                <Text style = {styles.header_text}>BIN</Text>
                <TextInput onChangeText={(text)=> setBinCode(text)} placeholder="Bin Number" style = {styles.bin_input}></TextInput>
                <Text style = {styles.header_text}>Complaint</Text> */}
                <TextInput defaultValue={complaint} multiline = {true} style = {styles.complaint_container} placeholder="Complaint" onChangeText={(text)=> setComplaint(text)}></TextInput>
                <TouchableOpacity onPress={createContaminationComplaint} style = {styles.submitButton}>
                    <Text style = {styles.submitText} >Submit</Text>
                </TouchableOpacity>
            </View>
            

            
        </>
    )
}

const styles = StyleSheet.create({
    reportText:{
        textAlign: "center",
        fontSize: 38,
        fontFamily: "Outfit-Bold",
        color: "white"
    },
    container: {
        marginLeft: "auto",
        marginRight:"auto",
        height: "auto",
        padding: 30,
        backgroundColor: "black",
        gap: 12,
        position: "relative",
        minHeight: "100%",
        width: "100%"
    },
    bin_input:{
        height: 50,
        backgroundColor: "white",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        fontSize: 17.5,
        fontFamily: "Outfit"
    },
    complaint_container: {
        backgroundColor: "white",
        borderStyle: "solid",
        borderWidth: 1,
        height: 300,
        textAlignVertical: "top",
        padding: 20,
        fontSize: 17.5,
        borderRadius: 10,
        fontFamily: "Outfit"
    },
    submitButton: {
        marginTop: 30,
        borderRadius: 10,
        display: "flex",
        backgroundColor: "#4ecdc4",
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    header_text: {
        fontSize: 20,
        fontFamily: "Outfit-Bold",
        color: "white"
    },
    submitText: {
        fontFamily: "Outfit-Bold",
        fontSize: 20,
        color: "white"
    }
})