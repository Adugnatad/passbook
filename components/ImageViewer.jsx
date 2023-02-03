import { View, Image } from 'react-native'
import React from 'react'

const ImageViewer = ({ route }) => {
    const { invoker } = route.params;
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'data:image/jpeg;base64,' + invoker }}
                style={{ width: 200, height: 200 }}
            />
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
}

export default ImageViewer