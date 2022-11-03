import React, { FC } from "react"
import { TextInput as Input } from "react-native-paper"
import { theme } from "../../core/theme"

interface CustomInputInterface {
    value: string
    error: boolean
    setValue?: ({ value, error }) => void
}

const CustomInput: FC<CustomInputInterface> = ({ value, error, setValue }) => {
    return (
        <Input
            style={{ backgroundColor: theme.colors.surface }}
            underlineColor="transparent"
            theme={{ colors: { primary: theme.colors.primary } }}
            mode="flat"
            label="Title"
            returnKeyType="next"
            value={value}
            onChangeText={(text) => setValue({ value: text, error: "" })}
            error={!!error}
        />
    )
}

export default CustomInput
