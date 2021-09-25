import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { Text, View, Image, TouchableOpacity, Button,StyleSheet } from 'react-native';

export default function Scanner() {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
        console.log(hasPermission);
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        console.log(type,data);
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    return (
        <View style = {{flex:1, alignItems: "center", justifyContent: "center"}}>
            <Text style = {{fontSize:18, fontWeight:"bold", position: "absolute", top:45}}>Scan the QR code displayed on the website</Text>
            {/* <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{position: "absolute", top:50, width: "100%", height: "100%"}}
                /> */}
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}

