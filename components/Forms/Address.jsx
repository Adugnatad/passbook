import { useFormik } from "formik";
import React, { useContext } from "react";
import { Text, Button, StyleSheet, ScrollView } from "react-native";
import { Stack, Input, WarningOutlineIcon } from "native-base";
import { FormContext } from "../../App";
import * as yup from "yup";


export const Address = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const ValidationSchema = yup.object().shape({
    postCode: yup.string().max(5, 'invalid postcode'),
    country: yup.string().required('Required'),
    city: yup.string().max(50, 'max characters reached').required('Required'),
    subCity: yup.string().max(50, 'max characters reached').required('Required'),
    houseNo: yup.string().max(100, 'max characters reached').required('Required'),
  });




  const formikProps = useFormik({
    initialValues: {
      postCode: formData?.postCode ? formData.postCode : "",
      country: "Ethiopia",
      city: formData?.city ? formData.city : "",
      subCity: formData?.subCity ? formData.subCity : "",
      houseNo: formData?.houseNo ? formData.houseNo : "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      setActiveStepIndex(activeStepIndex + 1);
    }
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Address Information</Text>
      <Stack space={3} w="90%" my="10px">
        <Input size="md" placeholder="Post Code" keyboardType="number-pad" onChangeText={formikProps.handleChange("postCode")} onBlur={formikProps.handleBlur("postCode")} value={formikProps.values.postCode} />
        {formikProps.errors.postCode && formikProps.touched.postCode && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.postCode}</Text> </Text>}
        <Input size="md" placeholder="Country*" isReadOnly={true} onChangeText={formikProps.handleChange("country")} onBlur={formikProps.handleBlur("country")} value={formikProps.values.country} />
        {formikProps.errors.country && formikProps.touched.country && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.country}</Text> </Text>}
        <Input size="md" placeholder="Town City*" onChangeText={formikProps.handleChange("city")} onBlur={formikProps.handleBlur("city")} value={formikProps.values.city} />
        {formikProps.errors.city && formikProps.touched.city && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.city}</Text> </Text>}
        <Input size="md" placeholder="Zone Sub city*" onChangeText={formikProps.handleChange("subCity")} onBlur={formikProps.handleBlur("subCity")} value={formikProps.values.subCity} />
        {formikProps.errors.subCity && formikProps.touched.subCity && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.subCity}</Text> </Text>}
        <Input size="md" placeholder="Woreda Kebele HouseNO*" onChangeText={formikProps.handleChange("houseNo")} onBlur={formikProps.handleBlur("houseNo")} value={formikProps.values.houseNo} />
        {formikProps.errors.houseNo && formikProps.touched.houseNo && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.houseNo}</Text> </Text>}
        <Button onPress={formikProps.handleSubmit} title="Submit" />
      </Stack>
    </ScrollView >

  );
}

const styles = StyleSheet.create(
  {
    container: {
      width: '100%',
      alignItems: "center",
      backgroundColor: "#fff",
      flex: 1,
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
