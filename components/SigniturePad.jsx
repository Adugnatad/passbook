import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import SignatureScreen from "react-native-signature-canvas";
import { useRef } from 'react';
import { FormContext } from '../App';

export const SigniturePad = ({ navigation }) => {
    const { setSignature } =
        useContext(FormContext);
    const ref = useRef();

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        // console.log(signature);
        setSignature(signature);
        navigation.goBack();
        // onOK(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log("clear success!");
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };

    return (
        <SignatureScreen
            ref={ref}
            onOK={handleOK}
            onEmpty={handleEmpty}
            onClear={handleClear}
            onGetData={handleData}
            autoClear={true}
            trimWhitespace={true}
            imageType="image/svg+xml"
        />
    );
}