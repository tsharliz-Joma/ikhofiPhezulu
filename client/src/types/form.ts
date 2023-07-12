export interface FormFieldModel {
    id?: string
    label?: string
    type?: string
    maxLength?: number
    showCharsLeft?: boolean
    defaultValue?: any
    required?: boolean
}

export interface FormModel {
    fields?: FormFieldModel[]
}