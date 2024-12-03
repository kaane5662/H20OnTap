import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native"

export default function SubscriptionBox(){
    return(
        <View style = {styles.container}>
            <Text style = {styles.header}>Entry</Text>
            <View style = {styles.price_header}>
                <Text style = {styles.price}>$10.99</Text>
                <Text style = {styles.per_month}>/month</Text>
            </View>
            <View style = {styles.features}>
                <Text style = {styles.feature}>Pipe Filtration Checks</Text>
                <Text style = {styles.feature}>Water Tank Checks</Text>
                <Text style = {styles.feature}>Instant Lead Parts Per Million Reports</Text>
            </View>
            <TouchableOpacity style = {styles.buy_background}>
                <Text style = {styles.buy_text}>Buy</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        backgroundColor: "white",
        display: "grid",
        gap: 4,
        alignItems: "center",
        height: "auto",
        border: "2",
        borderStyle: "solid", 
        borderColor: "blue",
    },
    header: {
        fontFamily: "Outfit-Bold",
        fontSize: 30,
        textAlign: "center"
    },
    price_header: {
        display: "flex",
        gap: 4,
        flexDirection: "row",
        paddingBottom: 20
    },
    price: {
        fontSize: 35,
        fontFamily: "Outfit-Bold",
        color: "#4ecdc4"
    },
    bold: {
        fontFamily: "Outfit-Bold"
    },
    per_month: {
        fontSize: 18,
        fontFamily: "Outfit",
        alignSelf: "flex-end"
    },
    features: {
        display: "flex",
        justifyContent: "center",
        gap: 20,
        alignItems: "center"
    },
    feature: {
        fontSize: 20,
        fontFamily: "Outfit"
    },
    buy_background: {
        width: 300,
        height: 75,
        backgroundColor: "black",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    buy_text: {
        fontFamily: "Outfit-Bold",
        fontSize: 25,
        color: "white"
    }

})