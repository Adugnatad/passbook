import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Text, Image, Button, View, ScrollView, StyleSheet } from "react-native";
import { Stack, WarningOutlineIcon } from "native-base";
import { FormContext } from "../../App";
import { TouchableOpacity } from "react-native";
import { ImageP } from "../ImagePicker";
import { FormNavigation } from "../FormNavigation";
import Checkbox from "expo-checkbox";


export const Agreement = ({ navigation }) => {
    const {
        setOpenModal,
        photo,
        idFront,
        idBack,
        signature,
        formData, setFormData } =
        useContext(FormContext);
    const [agreementCheck, setAgreementCheck] = useState(false);
    const [mergedImages, setMergedImages] = useState(null);
    const [submitButton, setSubmitMethod] = useState(false);
    const mergeImages = require('merge-base64');


    const submitMethod = () => {
        setSubmitMethod(true);
        if (agreementCheck) {
            formikProps.handleSubmit();
        }
    }

    const openImageModal = () => {
        setOpenModal(true);
    }

    useEffect(() => {
        if (photo && idFront && idBack && signature) {
            mergeBase64();
        }
    }, [photo, idFront, idBack, signature])

    const mergeBase64 = async () => {
        try {
            const signatureBase64 = signature.replace('data:image/png;base64,', "");
            const merged = await mergeImages([photo, idFront, idBack, signatureBase64], { color: "#fff" });
            setMergedImages(merged);
        } catch (e) {
            console.log(e);
        }
    }

    const formikProps = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            const data = { ...formData, mergedImages };
            setFormData(data);
        }
    })


    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1
        }}>
            <FormNavigation />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Agreement</Text>
                <Stack space={3} w="90%" my="10px">
                    <TouchableOpacity style={styles.idStyle} onPress={() => openImageModal()} >
                        {!signature ? <Text>Applicant's Signiture*</Text> :
                            <Image
                                source={{ uri: signature }}
                                style={{ width: 200, height: 200 }}
                            />
                        }
                    </TouchableOpacity>
                    {!signature && submitButton && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>signiture is required!</Text> </Text>}
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={agreementCheck}
                            onValueChange={() => navigation.navigate("Agreement", { setAgreementCheck })}
                            color={true ? '#B9B9B9' : undefined}
                        />
                        <Text style={styles.label}>By ticking, you are confirming that you have read, understood and agree to the <Text style={{ textDecorationLine: "underline", color: "#61636D" }}>terms and conditions</Text></Text>
                    </View>
                    {!agreementCheck && submitButton && signature && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>please confirm the agreement conditions!</Text> </Text>}
                    <ImageP invoker="signiture" navigation={navigation} />
                    <Button onPress={submitMethod} title="Submit" />
                </Stack>
            </ScrollView >
        </View>

    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            flex: 1,
            alignItems: "center",
        },
        header: {
            fontSize: 20,
            marginBottom: 10,
            fontWeight: "bold"
        },
        inputFieldContainer: {
            width: "100%"
        },
        inputLabel: {
            fontSize: 20,
            fontWeight: "400"
        },
        inputFieldsStyle: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 6,
            paddingHorizontal: 20,
            backgroundColor: "white",
            elevation: 4,
        },
        inputStyle: {
            flex: 1,
            borderLeftWidth: 2,
            marginHorizontal: 10,
            paddingHorizontal: 10,
            borderLeftColor: "#00ADEF"
        },

        errorText: {
            color: "#FF0000",
            fontSize: 12,
            alignItems: "center",
            justifyContent: "center",
        },
        idStyle: {
            // width: 200,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#ddd",
        },
        checkboxContainer: {
            flexDirection: 'row',
            alignItems: "flex-start",
        },
        checkbox: {
            marginTop: 5,
            borderWidth: 2,
            borderColor: "red"
        },
        label: {
            marginHorizontal: 8,
            lineHeight: 20,
            color: "#788086",
        },
    }
);
