import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FormContext } from "../App";

import RBSheet from "react-native-raw-bottom-sheet";

import * as ImagePicker from 'expo-image-picker';

export const ImageP = ({ invoker, navigation }) => {

  const [image, setImage] = useState(null);
  const {
    openModal, setOpenModal,
    setPhoto,
    setIdFront,
    setIdBack,
    setSignature
  } =
    useContext(FormContext);

  useEffect(() => {
    if (openModal) {
      refRBSheet.current.open()
    } else {
      refRBSheet.current.close()
    }
  }, [openModal])

  const choosePhotoFromLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
        quality: 1,
      });

      const base64 = result.assets[0].base64;
      if (invoker === 'photo') setPhoto(base64);
      if (invoker === 'idFront') setIdFront(base64);
      if (invoker === 'idBack') setIdBack(base64);
      if (invoker === 'signiture') {
        const signature = 'data:image/jpeg;base64,' + base64;
        setSignature(signature);

      }

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const takePhotoFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
        quality: 1,
      });

      const base64 = result.assets[0].base64;
      if (invoker === 'photo') setPhoto(base64);
      if (invoker === 'idFront') setIdFront(base64);
      if (invoker === 'idBack') setIdBack(base64);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const RenderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>{invoker !== 'signiture' ? 'Upload Photo' : 'Upload Signiture'}</Text>
      </View>
      {invoker !== 'signiture' ?
        <>
          <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
        </>
        :
        <>
          <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={() => { setOpenModal(false), navigation.navigate("Signiture") }}>
            <Text style={styles.panelButtonTitle}>Sign here</Text>
          </TouchableOpacity>
        </>
      }
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => refRBSheet.current.close()}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <RBSheet
        height={350}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        onClose={() => setOpenModal(false)}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(33,26,27,0.35)"
          },
          draggableIcon: {
            backgroundColor: "orange"
          }
        }}
      >
        <RenderInner />
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({

  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'orange',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});