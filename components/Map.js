import MapView,  {PROVIDER_GOOGLE, Marker, Heatmap} from 'react-native-maps';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Status from './Status';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {onAuthStateChanged} from 'firebase/auth'
import { getDoc, addDoc, collection, getDocFromServer, getDocs, query, where, onSnapshot, limit, orderBy, doc } from 'firebase/firestore';
// import Heatmap from "react-native-heatmap";
import { db, auth } from '../firebase/config';
import Complain from '../pages/Complain';
import AdminStatus from './AdminStatus';

export default function Map(){
    const [Markers, setMarkers] = useState([])

    const [MarkerData, setMarkerData] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [User, setUser] = useState(null)

    //ends at 19, start at 20
    const addToDb = async ()=>{
      console.log("Setting up Database")
      for(let i = 0; i < 20; i++){
        const docRef = await addDoc(collection(db, "homes"),{
          ...Markers[i],
          contaminated: false,
          complaint: "",
        })
      }
      console.log("Additions Complete")
    }

    



    const getMarkers = async ()=>{
      console.log("Fetching Data")
      const q = query(collection(db, "homes"), where("contaminated", "==", true))
      const markerSnapshot = await getDocs(q)
      const markersArray = markerSnapshot.docs.map((doc)=> doc.data())
      setMarkers(markersArray)
      console.log(markersArray)

      const snapshotQ = query(collection(db, "homes"), where("contaminated", "==", true), orderBy('timestamp', 'desc'), limit(1));
      
      
      console.log("Setting up snapshot listeners")

      const unsubscribe = onSnapshot(snapshotQ, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Access the data for the newest document
          console.log("hello")
          setMarkers([...Markers, doc.data()])
        });
      });

                
      console.log("Completed Fetching Data and setting snapshot listeners")
    }


    const getDataset = ()=>{
      axios.get("https://data.cityofnewyork.us/resource/3ub5-4ph8.json?$query=SELECT%0A%20%20%60development%60%2C%0A%20%20%60tds%60%2C%0A%20%20%60building%60%2C%0A%20%20%60borough%60%2C%0A%20%20%60house%60%2C%0A%20%20%60street%60%2C%0A%20%20%60address%60%2C%0A%20%20%60city%60%2C%0A%20%20%60state%60%2C%0A%20%20%60zip_code%60%2C%0A%20%20%60bin%60%2C%0A%20%20%60block%60%2C%0A%20%20%60lot%60%2C%0A%20%20%60borough_block_lot%60%2C%0A%20%20%60census_tract_2010%60%2C%0A%20%20%60neighborhood_tabulation_area%60%2C%0A%20%20%60neighborhood_tabulation_area_1%60%2C%0A%20%20%60community_district%60%2C%0A%20%20%60city_council_district%60%2C%0A%20%20%60state_assembly_district%60%2C%0A%20%20%60state_senate_district%60%2C%0A%20%20%60us_congressional_district%60%2C%0A%20%20%60latitude%60%2C%0A%20%20%60longitude%60").then((response)=>{
        // console.log(response.data)
        setMarkers(response.data)
      }).catch((error)=>{
          console.log(error)
      })
    }

    const getUser = async ()=>{
      setUser(null)
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid))
      if(!userDoc.exists) return
      setIsAdmin(userDoc.data().isAdmin)
      setUser(userDoc.data())
      
    }


    useEffect(()=>{
      // getDataset()
      getMarkers()
      getUser()
    }, [])

    const customMapStyle = require('../CustomMapStyle.json');
    return (
        <>
        
        
        <MapView onPress={(e)=>setMarkerData(null)} style = {styles.map}
            provider={PROVIDER_GOOGLE} 
            customMapStyle={customMapStyle}
            initialRegion={{
                latitude: 40.7409744,
                longitude: -73.9536441,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
            
            {Markers.map((marker, index)=>{
              return(
                <Marker icon={null} pinColor='#4ecdc4' onDeselect={(e)=> setMarkerData(null)} onPress={(e)=> setMarkerData(marker)} key={index} coordinate={{latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}></Marker>
              )
            })}


            {
              Markers.length > 0 ? (
                <Heatmap
              points={
                Markers?.map((marker)=>{
                  return (
                    {
                      latitude: Number(marker.latitude),
                      longitude: Number(marker.longitude)
                    }
                  )
                })
              }
              radius={30} // Adjust the radius to control the heatmap density
              opacity={.5} // Adjust the opaity of the heatmap
            />
              ): null
            }
            
            
            {/* <Marker  coordinate={{latitude: 40.7409744, longitude: -73.9536441}}>

            </Marker> */}
        </MapView>
        {MarkerData ? 
        (isAdmin? (<AdminStatus marker={MarkerData}></AdminStatus>): (<Status marker={MarkerData}></Status>)
        
          ):
        null
        }
        <View style={styles.sentServicesContainer}>
            {User?.sent_service == 1 ?(<Text style = {styles.textService}>Sent Pipe Fitration Checks</Text>) : null}
            {User?.sent_service == 2 ?(<Text style = {styles.textService}>Sent Water Filtration Checks</Text>) : null}
            {User?.sent_service == 3 ?(<Text style = {styles.textService}>Sent Pipe + Water Checks</Text>) : null}
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      height: "100%",
      backgroundColor: "#2b2d42"
    },
    sentServicesContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      position: "absolute",
      bottom: 80, 
      justifyContent: "center",
      alignItems: "center",
      zIndex: 0
    },
    textService:{
      fontSize: 30,
      fontFamily: "Outfit",
      color: "white",
      textAlign: "center",
      textShadowColor: "black",
      textShadowRadius: 40,
    
    }
  });