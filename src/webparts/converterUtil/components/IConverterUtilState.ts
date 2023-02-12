import { IDropdownOption } from "@fluentui/react";


export interface IConverterUtilState {
    errorMessage: string;
    selectedRate: number,
    userValue: number,
    selectedCurrency: string,
    result: number,
    inputItems: IDropdownOption[]
}