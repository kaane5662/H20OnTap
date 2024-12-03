import { useFonts } from "expo-font";
import { StyleSheet, Text } from "react-native";
export default function StyledText({style, children}){
    let fontsLoaded = useFonts({
        "Outfit": require('../assets/fonts/Outfit-Regular.ttf')
    })
    return(
        <Text style = {[style, styles.st_text]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    st_text: {
        fontFamily: "Outfit"
    }
})