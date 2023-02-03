import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import SignatureScreen from "react-native-signature-canvas";
import { useRef } from 'react';
import { FormContext } from '../App';

export const SigniturePad = ({ navigation }) => {
    const { setSignature } =
        useContext(FormContext);
    const ref = useRef();

    const handleOK = (signature) => {
        setSignature(signature);
        navigation.goBack();
    };

    const handleEmpty = () => {
        console.log("Empty");
    };

    const handleClear = () => {
        console.log("clear success!");
    };

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