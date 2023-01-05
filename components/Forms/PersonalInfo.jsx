import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Text, Button, StyleSheet, View, ScrollView, Image, TextInput } from "react-native";
import { Stack, Input, WarningOutlineIcon } from "native-base";
import { FormContext } from "../../App";
import * as yup from "yup";
import { TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { differenceInYears, format } from 'date-fns'
import { DropDown } from "../../components";
import Ethiopia from "../../assets/Ethiopia.png";

export const PersonalInfo = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showDate = () => {
    setShow(!show);
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const setFieldValue = (fieldName, value) => {
    formikProps.setFieldValue(fieldName, String(value));
  }

  useEffect(() => {
    const newdate = new Date();
    if (format(date, 'MM/dd/yyyy') !== format(newdate, 'MM/dd/yyyy'))
      formikProps.setFieldValue("DateofBirth", String(format(date, 'MM/dd/yyyy')))
  }, [date])

  function PhoneCountry() {
    return (
      <View style={styles.action}>
        <TouchableOpacity style={styles.callingArea}>
          <View style={styles.countryFlag}>
            <Image
              source={Ethiopia}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <View style={styles.callingCode}>
            <Text style={{ color: "#000" }}>+251</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="Enter Phone Number"
          placeholderTextColor={"#C7C7CD"}
          selectionColor={"black"}
          keyboardType="number-pad"
          onChangeText={formikProps.handleChange("phoneNumber")}
          onBlur={formikProps.handleBlur("phoneNumber")}
          value={formikProps.values.phoneNumber}
        />
      </View>)
  }

  const ValidationSchema = yup.object().shape({
    title: yup.string().required('Required'),
    fullName: yup.string().max(50, 'max characters reached').required('Required'),
    motherName: yup.string().max(50, 'max characters reached').required('Required'),
    DateofBirth: yup.string().test("DateofBirth", "must be atleast 18 years old", function (value) {
      const date = new Date(value);
      return differenceInYears(new Date(), date) >= 18;
    }).required('Required'),
    gender: yup.string().required('Required'),
    maritalStatus: yup.string().required('Required'),
    phoneNumber: yup.string().min(9, "invalid phone Number").max(10, "invalid phone Number").required('Required'),
    email: yup.string().max(50, "max characters reached").email("please enter valid email"),

  });




  const formikProps = useFormik({
    initialValues: {
      title: formData?.title ? formData.title : "",
      fullName: formData?.fullName ? formData.fullName : "",
      motherName: formData?.motherName ? formData.motherName : "",
      DateofBirth: formData?.DateofBirth ? formData.DateofBirth : "",
      gender: formData?.gender ? formData.gender : "",
      maritalStatus: formData?.maritalStatus ? formData.maritalStatus : "",
      phoneNumber: formData?.phoneNumber ? formData.phoneNumber : "",
      email: formData?.email ? formData.email : "",
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
      <Text style={styles.header}>Personal Information</Text>
      <Stack space={3} w="90%" my="10px">
        <DropDown title='Title*' fieldName='title' items={[{ label: "MR" }, { label: "MS" }, { label: "MRS" }, { label: "DR" }, { label: "MISS" }]} setFieldValue={setFieldValue} value={formikProps.values.title} touched={formikProps.touched.title} />
        <Input size="md" placeholder="Full name inc. grandfather name*" onChangeText={formikProps.handleChange("fullName")} onBlur={formikProps.handleBlur("fullName")} value={formikProps.values.fullName} />
        {formikProps.errors.fullName && formikProps.touched.fullName && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.fullName}</Text> </Text>}
        <Input size="md" placeholder="Mother Name*" onChangeText={formikProps.handleChange("motherName")} onBlur={formikProps.handleBlur("motherName")} value={formikProps.values.motherName} />
        {formikProps.errors.motherName && formikProps.touched.motherName && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.motherName}</Text> </Text>}
        <TouchableOpacity onPress={showDate}>
          <Input size="md" placeholder="Date of birth*" onChangeText={formikProps.handleChange("DateofBirth")} onBlur={formikProps.handleBlur("DateofBirth")} isReadOnly={true} value={formikProps.values.DateofBirth} />
        </TouchableOpacity>
        {formikProps.errors.DateofBirth && formikProps.touched.DateofBirth && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.DateofBirth}</Text> </Text>}
        <DropDown title='Gender*' fieldName='gender' items={[{ label: "FEMALE" }, { label: "MALE" }]} setFieldValue={setFieldValue} value={formikProps.values.gender} touched={formikProps.touched.gender} />
        <DropDown title='Marital Status' fieldName='maritalStatus' items={[{ label: "SINGLE" }, { label: "MARRIED" }]} setFieldValue={setFieldValue} value={formikProps.values.maritalStatus} touched={formikProps.touched.gender} />
        {PhoneCountry()}
        {formikProps.errors.phoneNumber && formikProps.touched.phoneNumber && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.phoneNumber}</Text> </Text>}
        <Input size="md" placeholder="Email" onChangeText={formikProps.handleChange("email")} onBlur={formikProps.handleBlur("email")} value={formikProps.values.email} />
        {formikProps.errors.email && formikProps.touched.email && <Text style={styles.errorText}><WarningOutlineIcon size="xs" color='red.500' /> <Text>{formikProps.errors.email}</Text> </Text>}
        <Button onPress={formikProps.handleSubmit} title="Submit" />
      </Stack>

      {
        show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date ? date : new Date()}
            mode={'date'}
            onChange={onChange}
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
  }
);