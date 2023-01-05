import { createContext, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { StyleSheet } from 'react-native';
import { FormNavigation } from "./components/FormNavigation";
import { NavigationContainer } from '@react-navigation/native';
import { Route } from "./route";
export const FormContext = createContext();

export default function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [photo, setPhoto] = useState(null);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [signature, setSignature] = useState(null);

  console.log(formData);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <FormContext.Provider
          value={{
            openModal, setOpenModal,
            activeStepIndex, setActiveStepIndex,
            formData, setFormData,
            photo, setPhoto,
            idFront, setIdFront,
            idBack, setIdBack,
            signature, setSignature
          }}
        >
          <FormNavigation />
          <Route />
        </FormContext.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
