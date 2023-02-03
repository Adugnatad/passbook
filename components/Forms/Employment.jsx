import { Text, ScrollView, Button, View } from 'react-native'
import React from 'react'
import { Input, Stack } from 'native-base'
import { DropDown } from '../DropDown'
import { useFormik } from 'formik'
import { FormContext } from '../../App'
import * as yup from "yup";
import { useContext } from 'react'
import { WarningOutlineIcon } from "native-base";
import { FormNavigation } from '../FormNavigation'
import { useState } from 'react'

export const Employment = ({ navigation }) => {

    const {
        setActiveStepIndex,
        activeStepIndex,
        formData, setFormData } =
        useContext(FormContext);


    const ValidationSchema = yup.object().shape({
        employeeStatus: yup.string().required('Required'),
        jobTitle: yup.string().max(50, 'max characters reached').required('Required'),
        salary: yup.string().max(50, 'max characters reached').required('Required'),
        employeerName: yup.string().max(50, 'max characters reached').required('Required'),
        tinNumber: yup.string().max(10, 'max characters reached'),
    });

    const formikProps = useFormik({
        initialValues: {
            employeeStatus: formData?.employeeStatus ? formData?.employeeStatus : "",
            jobTitle: formData?.jobTitle ? formData?.jobTitle : "",
            salary: formData?.salary ? formData?.salary : "",
            employeerName: formData?.employeerName ? formData?.employeerName : "",
            tinNumber: formData?.tinNumber ? formData?.tinNumber : "",
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            const data = { ...formData, ...values };
            setFormData(data);
            setActiveStepIndex(activeStepIndex + 1);
        }
    })

    const setFieldValue = (fieldName, value) => {
        formikProps.setFieldValue(fieldName, String(value));
    }


    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1
        }}>
            <FormNavigation />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Employment</Text>
                <Stack space={3} w="90%" my="10px">
                    <DropDown title='Employee Status*' fieldName='employeeStatus' items={[{ label: "OTHER" }, { label: "RETIRED" }]} setFieldValue={setFieldValue} value={formikProps.values.employeeStatus} touched={formikProps.touched.employeeStatus} />
                    <Input size="md" placeholder="Job Title*" onChangeText={formikProps.handleChange("jobTitle")} onBlur={formikProps.handleBlur("jobTitle")} value={formikProps.values.jobTitle} />
                    {formikProps.errors.jobTitle && formikProps.touched.jobTitle && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.jobTitle}</Text> </Text>}
                    <Input size="md" placeholder="Salary*" keyboardType="number-pad" onChangeText={formikProps.handleChange("salary")} onBlur={formikProps.handleBlur("salary")} value={formikProps.values.salary} />
                    {formikProps.errors.salary && formikProps.touched.salary && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.salary}</Text> </Text>}
                    <Input size="md" placeholder="Employer Name*" onChangeText={formikProps.handleChange("employeerName")} onBlur={formikProps.handleBlur("employeerName")} value={formikProps.values.employeerName} />
                    {formikProps.errors.employeerName && formikProps.touched.employeerName && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.employeerName}</Text> </Text>}
                    <Input size="md" placeholder="Tin Number" keyboardType="number-pad" onChangeText={formikProps.handleChange("tinNumber")} onBlur={formikProps.handleBlur("tinNumber")} value={formikProps.values.tinNumber} />
                    {formikProps.errors.tinNumber && formikProps.touched.tinNumber && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.tinNumber}</Text> </Text>}
                    <Button onPress={() => formikProps.handleSubmit()} title="Submit" />
                </Stack>
            </ScrollView>
        </View>
    )
}

const styles = {
    container: {
        width: '100%',
        flex: 1,
        alignItems: "center",
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold"
    }
}