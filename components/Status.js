import { View, StyleSheet, Text, Button } from "react-native"
import backgroundColor from "../Globals"
import { useState } from "react"
import { useFonts } from "expo-font";
import StyledText from "./StyledText";

export default function Status({marker}){

    
    const [toggle, setToggle] = useState(false)
    return (
        
        

        <View style = {styles.center}>

            <View style= {[styles.container, styles.shadowProp]}>
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
    }
})