import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Text, Image, Button, StyleSheet, ScrollView } from "react-native";
import { Stack, Input, WarningOutlineIcon } from "native-base";
import { FormContext } from "../../App";
import * as yup from "yup";
import { TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import DropDown from "../DropDown";
import ImageP from "../ImagePicker";


export const Documents = ({ navigation }) => {
    const {
        setOpenModal,
        setActiveStepIndex,
        photo,
        idFront,
        idBack,
        signature,
        formData, setFormData } =
        useContext(FormContext);
    const [issueDate, setIssueDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [showIssue, setShowIssue] = useState(false);
    const [showExpiry, setShowExpiry] = useState(false);
    const [invoker, setInvoker] = useState(null);
    const [mergedImages, setMergedImages] = useState(null);
    const [submitButton, setSubmitMethod] = useState(false);
    const mergeImages = require('merge-base64');

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
    const ValidationSchema = yup.object().shape({
        legalId: yup.string().max(50, 'max characters reached').required('Required'),
        documentName: yup.string().required('Required'),
        issueAuthority: yup.string().required('Required'),
        issueDate: yup.string().required('Required'),
        expiryDate: yup.string().required('Required'),
        employeeStatus: yup.string().required('Required'),
        jobTitle: yup.string().max(50, 'max characters reached').required('Required'),
        salary: yup.string().max(50, 'max characters reached').required('Required'),
        employeerName: yup.string().max(50, 'max characters reached').required('Required'),
        tinNumber: yup.string().max(10, 'max characters reached'),
    });




    const formikProps = useFormik({
        initialValues: {
            legalId: formData?.legalId ? formData?.legalId : "",
            documentName: formData?.documentName ? formData?.documentName : "",
            issueAuthority: formData?.issueAuthority ? formData?.issueAuthority : "",
            issueDate: formData?.issueDate ? formData?.issueDate : "",
            expiryDate: formData?.expiryDate ? formData?.expiryDate : "",
            employeeStatus: formData?.employeeStatus ? formData?.employeeStatus : "",
            jobTitle: formData?.jobTitle ? formData?.jobTitle : "",
            salary: formData?.salary ? formData?.salary : "",
            employeerName: formData?.employeerName ? formData?.employeerName : "",
            tinNumber: formData?.tinNumber ? formData?.tinNumber : "",
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            const data = { ...formData, ...values, mergedImages };
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Documents</Text>
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
                <DropDown title='Employee Status*' fieldName='employeeStatus' items={[{ label: "OTHER" }, { label: "RETIRED" }]} setFieldValue={setFieldValue} value={formikProps.values.employeeStatus} touched={formikProps.touched.employeeStatus} />
                <Input size="md" placeholder="Job Title*" onChangeText={formikProps.handleChange("jobTitle")} onBlur={formikProps.handleBlur("jobTitle")} value={formikProps.values.jobTitle} />
                {formikProps.errors.jobTitle && formikProps.touched.jobTitle && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.jobTitle}</Text> </Text>}
                <Input size="md" placeholder="Salary*" keyboardType="number-pad" onChangeText={formikProps.handleChange("salary")} onBlur={formikProps.handleBlur("salary")} value={formikProps.values.salary} />
                {formikProps.errors.salary && formikProps.touched.salary && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.salary}</Text> </Text>}
                <Input size="md" placeholder="Employer Name*" onChangeText={formikProps.handleChange("employeerName")} onBlur={formikProps.handleBlur("employeerName")} value={formikProps.values.employeerName} />
                {formikProps.errors.employeerName && formikProps.touched.employeerName && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.employeerName}</Text> </Text>}
                <Input size="md" placeholder="Tin Number" keyboardType="number-pad" onChangeText={formikProps.handleChange("tinNumber")} onBlur={formikProps.handleBlur("tinNumber")} value={formikProps.values.tinNumber} />
                {formikProps.errors.tinNumber && formikProps.touched.tinNumber && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.tinNumber}</Text> </Text>}
                <TouchableOpacity style={styles.idStyle} onPress={() => openImageModal('photo')}>
                    {!photo ? <Text>Applicant's Photo*</Text> :
                        <Image
                            source={{ uri: 'data:image/jpeg;base64,' + photo }}
                            style={{ width: 200, height: 200 }}
                        />
                    }
                </TouchableOpacity>
                {!photo && submitButton && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>image is required!</Text> </Text>}
                <TouchableOpacity style={styles.idStyle} onPress={() => { navigation.navigate("Signiture") }}>
                    {!signature ? <Text>Applicant's Signiture*</Text> :
                        <Image
                            source={{ uri: signature }}
                            style={{ width: 200, height: 200 }}
                        />
                    }
                </TouchableOpacity>
                {!signature && submitButton && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>signiture is required!</Text> </Text>}
                <TouchableOpacity style={styles.idStyle} onPress={() => openImageModal('idFront')}>
                    {!idFront ? <Text>Applicant's Id Front*</Text> :
                        <Image
                            source={{ uri: 'data:image/jpeg;base64,' + idFront }}
                            style={{ width: 200, height: 200 }}
                        />
                    }
                </TouchableOpacity>
                {!idFront && submitButton && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>id Front is required!</Text> </Text>}
                <TouchableOpacity style={styles.idStyle} onPress={() => openImageModal('idBack')}>
                    {!idBack ? <Text>Applicant's Id Back*</Text> :
                        <Image
                            source={{ uri: 'data:image/jpeg;base64,' + idBack }}
                            style={{ width: 200, height: 200 }}
                        />
                    }
                </TouchableOpacity>
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

    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            alignItems: "center",
            backgroundColor: "#fff",
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
        }
    }
);
