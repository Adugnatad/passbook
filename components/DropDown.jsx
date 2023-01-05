import { FormControl, Select, Center, CheckIcon, WarningOutlineIcon } from "native-base";
import React from 'react'

export const DropDown = ({ title, fieldName, items, setFieldValue, value, touched }) => {
    return <Center>
        <FormControl w="100%" maxW="100%" isRequired isInvalid>
            <Select minWidth="100%" fontSize={12} accessibilityLabel={title} placeholder={title} _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />
            }} mt="1" onValueChange={itemValue => setFieldValue(fieldName, itemValue)}>
                {items.map((item, index) => (
                    <Select.Item key={index} label={item.label} value={item.label} />
                ))}
            </Select>
            {!value && touched && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Please make a selection!
            </FormControl.ErrorMessage>}
        </FormControl>
    </Center>;
}