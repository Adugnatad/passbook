import { View, Text, ScrollView, Button } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AgreementPolicy = ({ route, navigation }) => {
    const { setAgreementCheck } = route.params;
    const handleActions = (checked) => {
        if (checked) {
            setAgreementCheck(true);
            navigation.goBack();
        } else {
            setAgreementCheck(false);
            navigation.goBack();
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Terms of Service</Text>
                <Text style={styles.content}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sed culpa facilis iure animi repudiandae sequi, delectus
                    labore nulla illum necessitatibus voluptates perferendis
                    velit? Officiis dolore excepturi unde repudiandae deserunt
                    ratione?Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Quam numquam magni dolores corporis in eligendi
                    aspernatur repellendus nemo! Excepturi maiores tempora
                    quae hic molestias doloribus fugit quo, esse tempore ratione?
                </Text>
                <Text style={styles.title}>Authorized Users</Text>
                <Text style={styles.content}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sed culpa facilis iure animi repudiandae sequi, delectus
                    labore nulla illum necessitatibus voluptates perferendis
                    velit? Officiis dolore excepturi unde repudiandae deserunt
                    ratione?Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Quam numquam magni dolores corporis in eligendi
                    aspernatur repellendus nemo! Excepturi maiores tempora
                    quae hic molestias doloribus fugit quo, esse tempore ratione?
                </Text>
                <Text style={styles.title}>Terms of Service</Text>
                <Text style={styles.content}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sed culpa facilis iure animi repudiandae sequi, delectus
                    labore nulla illum necessitatibus voluptates perferendis
                    velit? Officiis dolore excepturi unde repudiandae deserunt
                    ratione?Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Quam numquam magni dolores corporis in eligendi
                    aspernatur repellendus nemo! Excepturi maiores tempora
                    quae hic molestias doloribus fugit quo, esse tempore ratione?
                </Text>
                <Text style={styles.title}>Authorized Users</Text>
                <Text style={styles.content}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sed culpa facilis iure animi repudiandae sequi, delectus
                    labore nulla illum necessitatibus voluptates perferendis
                    velit? Officiis dolore excepturi unde repudiandae deserunt
                    ratione?Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Quam numquam magni dolores corporis in eligendi
                    aspernatur repellendus nemo! Excepturi maiores tempora
                    quae hic molestias doloribus fugit quo, esse tempore ratione?
                </Text>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleActions(true)}>
                    <Text style={{ color: "#fff", textAlign: "center" }}>I accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => handleActions(false)}>
                    <Text style={{ textAlign: "center" }}>I decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = {
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 25,
    },
    scrollContainer: {
        marginBottom: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 10,
    },
    content: {
        color: "#86858A"
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 50,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    button: {
        width: 100,
        backgroundColor: "#428DFD",
        color: "#fff",
        paddingVertical: 8
    },
    cancelButton: {
        backgroundColor: "#F6F6F6",
        color: "#000"
    }
}

export default AgreementPolicy