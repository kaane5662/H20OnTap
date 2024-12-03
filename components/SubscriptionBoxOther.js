import { View, Text, StyleSheet , TouchableOpacity} from "react-native"

export default function SubscriptonBoxOther({planName, planDetails, planCost, select, planId, selection}){
    return(
        <TouchableOpacity onPress = {()=> select(planId)} style = {[styles.container, {backgroundColor: planId == selection ? "#4ecdc4": "rgba(255,255,255,.25)"}]}>
            <View style = {styles.plan}>
                <Text style = {[styles.bold, styles.planText, styles.text]}>{planName}</Text>
                <View style = {styles.planDetails}>
                    {
                    planDetails?.map((detail, index)=>{
                        return(

                            <Text style = {[{fontSize: 17}, styles.outfitText, styles.text]} key={index} >{detail}</Text>
                        )
                    })
                    }   
                </View>
            </View>
            <View style = {styles.planCost}>
                <Text style = {[{fontSize: 30, color: planId == selection  ? "white" : "#4ecdc4"}, styles.bold]}>${planCost}</Text>
                <Text style = {[{fontSize: 20}, styles.outfitText, styles.text]}>/mo</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        borderRadius: 25,
        alignItems: "center",
        borderColor: "rgba(0,0,0,.3)",
        borderWidth: 2,
        color: "white"
    },
    plan: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: "60%"
    },
    planDetails: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
    },
    bold: {
        fontFamily: "Outfit-Bold"
    },
    planCost: {
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "flex-end"
    },
    planText: {
        fontSize: 20
    },
    outfitText: {
        fontFamily: "Outfit"
    },
    text: {
        color: "white"
    }
})