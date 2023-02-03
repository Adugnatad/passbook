import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Text, Image, Button, StyleSheet, ScrollView } from "react-native";
import { Stack, Input, WarningOutlineIcon, View } from "native-base";
import { FormContext } from "../../App";
import * as yup from "yup";
import { TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import { DropDown } from "../DropDown";
import { ImageP } from "../ImagePicker";
import Upload from "../../assets/Upload.svg";
import Eye from "../../assets/Eye.svg";
import { FormNavigation } from "../FormNavigation";
import { TextInput } from "react-native-gesture-handler";


export const Documents = ({ navigation }) => {
    const {
        setOpenModal,
        setActiveStepIndex,
        activeStepIndex,
        photo,
        idFront,
        idBack,
        formData, setFormData } =
        useContext(FormContext);
    const [issueDate, setIssueDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [showIssue, setShowIssue] = useState(false);
    const [showExpiry, setShowExpiry] = useState(false);
    const [invoker, setInvoker] = useState(null);
    const [submitButton, setSubmitMethod] = useState(false);

    const showDate = (invoker) => {
        if (invoker === "Issue") {
            setShowIssue(!showIssue);
        } else {
            setShowExpiry(!showExpiry);
        }
    };

    const openImageModal = (invoker) => {
        setOpenModal(true);
        setInvoker(invoker);
    }

    const submitMethod = () => {
        setSubmitMethod(true);
        formikProps.handleSubmit();
    }

    const ValidationSchema = yup.object().shape({
        legalId: yup.string().max(50, 'max characters reached').required('Required'),
        documentName: yup.string().required('Required'),
        issueAuthority: yup.string().required('Required'),
        issueDate: yup.string().required('Required'),
        expiryDate: yup.string().required('Required'),

    });




    const formikProps = useFormik({
        initialValues: {
            legalId: formData?.legalId ? formData?.legalId : "",
            documentName: formData?.documentName ? formData?.documentName : "",
            issueAuthority: formData?.issueAuthority ? formData?.issueAuthority : "",
            issueDate: formData?.issueDate ? formData?.issueDate : "",
            expiryDate: formData?.expiryDate ? formData?.expiryDate : "",
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            const data = { ...formData, ...values };
            setFormData(data);
            setActiveStepIndex(activeStepIndex + 1);
        }
    })

    const onChangeIssue = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowIssue(false);
        setIssueDate(currentDate);
    };

    const onChangeExpire = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowExpiry(false);
        setExpiryDate(currentDate);
    };


    const setFieldValue = (fieldName, value) => {
        formikProps.setFieldValue(fieldName, String(value));
    }

    useEffect(() => {
        const date = new Date();
        if (format(issueDate, 'MM/dd/yyyy') !== format(date, 'MM/dd/yyyy'))
            formikProps.setFieldValue("issueDate", String(format(issueDate, 'MM/dd/yyyy')))
    }, [issueDate])
    useEffect(() => {
        const date = new Date();
        if (format(expiryDate, 'MM/dd/yyyy') !== format(date, 'MM/dd/yyyy'))
            formikProps.setFieldValue("expiryDate", String(format(expiryDate, 'MM/dd/yyyy')))
    }, [expiryDate])

    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1
        }}>
            <FormNavigation />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Legal Documents</Text>
                <Stack space={3} w="90%" my="10px">
                    <Input size="md" placeholder="legal Id*" onChangeText={formikProps.handleChange("legalId")} onBlur={formikProps.handleBlur("legalId")} value={formikProps.values.legalId} />
                    {formikProps.errors.legalId && formikProps.touched.legalId && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.legalId}</Text> </Text>}
                    <DropDown title='Document Name*' fieldName='documentName' items={[{ label: "KEBELEID" }, { label: "EMPLOYEEID" }, { label: "PASSPORT" }, { label: "STUDENTID" }, { label: "DRIVING" }]} setFieldValue={setFieldValue} value={formikProps.values.documentName} touched={formikProps.touched.documentName} />
                    <Input size="md" placeholder="Choose Issue Authority*" onChangeText={formikProps.handleChange("issueAuthority")} onBlur={formikProps.handleBlur("issueAuthority")} value={formikProps.values.issueAuthority} />
                    {formikProps.errors.issueAuthority && formikProps.touched.issueAuthority && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.issueAuthority}</Text> </Text>}
                    <TouchableOpacity onPress={() => showDate("Issue")}>
                        <Input size="md" placeholder="Issue Date*" onChangeText={formikProps.handleChange("issueDate")} onBlur={formikProps.handleBlur("issueDate")} isReadOnly={true} value={formikProps.values.issueDate} />
                    </TouchableOpacity>
                    {formikProps.errors.issueDate && formikProps.touched.issueDate && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.issueDate}</Text> </Text>}
                    <TouchableOpacity onPress={() => showDate("Expire")}>
                        <Input size="md" placeholder="Expiry Date*" onChangeText={formikProps.handleChange("expiryDate")} onBlur={formikProps.handleBlur("expiryDate")} isReadOnly={true} value={formikProps.values.expiryDate} />
                    </TouchableOpacity>
                    {formikProps.errors.expiryDate && formikProps.touched.expiryDate && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.expiryDate}</Text> </Text>}
                    <View style={styles.uploadContainer}>
                        <View style={styles.photoButtons}>
                            <TouchableOpacity onPress={() => openImageModal('photo')}><Upload width={22} height={22} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("ImageViewer", { invoker: photo }) }}><Eye width={22} height={22} /></TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Applicant's Photo</Text>
                    </View>
                    {!photo && submitButton && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>image is required!</Text> </Text>}
                    <View style={styles.uploadContainer}>
                        <View style={styles.photoButtons}>
                            <TouchableOpacity onPress={() => openImageModal('idFront')}><Upload width={22} height={22} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("ImageViewer", { invoker: idFront }) }}><Eye width={22} height={22} /></TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Applicant's Id front</Text>
                    </View>
                    {!idFront && submitButton && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>id Front is required!</Text> </Text>}
                    <View style={styles.uploadContainer}>
                        <View style={styles.photoButtons}>
                            <TouchableOpacity onPress={() => openImageModal('idBack')}><Upload width={22} height={22} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("ImageViewer", { invoker: idBack }) }}><Eye width={22} height={22} /></TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Applicant's Id Back</Text>
                    </View>
                    {!idBack && submitButton && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>id Back is required!</Text> </Text>}
                    <ImageP invoker={invoker} />
                    <Button onPress={submitMethod} title="Submit" />
                </Stack>

                {showIssue && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={issueDate ? issueDate : ""}
                        mode={'date'}
                        onChange={onChangeIssue}
                    />
                )
                }
                {showExpiry && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={expiryDate ? expiryDate : ""}
                        mode={'date'}
                        onChange={onChangeExpire}
                    />
                )
                }
            </ScrollView >
        </View>

    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            alignItems: "center",
        },
        header: {
            fontSize: 20,
            marginBottom: 10,
            fontWeight: "bold"
        },
        errorText: {
            color: "#FF0000",
            fontSize: 12,
            alignItems: "center",
            justifyContent: "center",
        },

        action: {
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#ddd",
            alignItems: "center",
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === "ios" ? 0 : -12,
            paddingLeft: 10,
            color: "#05375A",
        },
        button: {
            alignItems: "center",
            marginTop: 50,
        },
        signIn: {
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
        },
        signin: {
            borderColor: "#00ADEF",
            borderWidth: 1,
            marginTop: 15,
        },
        textSign: {
            fontSize: 18,
            fontWeight: "bold",
        },
        textPrivate: {
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
        },
        color_textPrivate: {
            color: "gray",
        },
        errorMsg: {
            color: "#FF0000",
            fontSize: 14,
        },
        callingArea: {
            width: 100,
            height: 50,
            marginHorizontal: 5,
            flexDirection: "row",
        },
        countryFlag: { justifyContent: "center", marginLeft: 5 },
        callingCode: { justifyContent: "center", marginLeft: 5 },
        phoneNumber: {
            flex: 1,
            marginVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#00ADEF",
            height: 40,
            color: "#05375A",
            lineHeight: 22,
            fontSize: 16,
        },
        animatable: { flexDirection: "row", alignItems: "center" },
        idStyle: {
            // width: 200,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#ddd",
        },
        uploadContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            borderWidth: 1,
            borderColor: "#ddd",
            paddingVertical: 10
        },
        photoButtons: {
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
        },
        label: {
            color: "#6E6B6B",
        }
    }
);
