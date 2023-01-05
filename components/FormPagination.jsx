import React, { useContext } from "react";
import { FormContext } from "../App";
import { PersonalInfo, Address, Documents } from '../components'

export const FormPagination = ({ navigation }) => {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <PersonalInfo navigation={navigation} />;
      break;
    case 1:
      stepContent = <Address navigation={navigation} />;
      break;
    case 2:
      stepContent = <Documents navigation={navigation} />;
      break;
    default:
      break;
  }

  return stepContent
}
