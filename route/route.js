import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FormPagination } from "../components";
import { SigniturePad } from "../components";

const Stack = createStackNavigator();

export const Route = () => {
    return (
        <Stack.Navigator
            initialRouteName="Registeration"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Registeration" component={FormPagination} />
            <Stack.Screen name="Signiture" component={SigniturePad} />
        </Stack.Navigator>
    );
}