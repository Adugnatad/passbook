import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import { FormNavigation, FormPagination } from "../components";
import { SigniturePad } from "../components";
import AgreementPolicy from '../components/AgreementPolicy';
import ImageViewer from '../components/ImageViewer';

const Stack = createStackNavigator();

export const Route = () => {
    return (
        <Stack.Navigator
            initialRouteName="Registeration"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="Registeration"
                component={FormPagination} />
            <Stack.Screen
                name="Signiture"
                component={SigniturePad} />
            <Stack.Screen
                options={{
                    title: "Agreements and Policy",
                    headerShown: true,
                }}
                name="Agreement"
                component={AgreementPolicy} />
            <Stack.Screen
                name="ImageViewer"
                component={ImageViewer} />
        </Stack.Navigator>
    );
}

const style = {

}