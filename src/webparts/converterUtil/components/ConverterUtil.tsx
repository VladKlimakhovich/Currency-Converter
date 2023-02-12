import * as React from 'react';
import styles from './ConverterUtil.module.scss';
import { IConverterUtilProps } from './IConverterUtilProps';
import { IConverterUtilState } from './IConverterUtilState';
import ConverterUtilService from './ConverterUtilService';
import { TextField } from '@fluentui/react/lib/components/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';


export default class ConverterUtil extends React.Component<IConverterUtilProps, IConverterUtilState> {

  constructor(props: IConverterUtilProps | Readonly<IConverterUtilProps>, state: IConverterUtilState | Readonly<IConverterUtilState>) {
    super(props);

    this.state = {
      userValue: 1,
      selectedCurrency: '',
      result: 1,
      selectedRate: 1,
      inputItems: [
      ],
      errorMessage: ''
    }
    this.ConverterUtilService = new ConverterUtilService(props.webPartContext)
  }


  private ConverterUtilService: ConverterUtilService;

  private async loadData(): Promise<any> {
    try {
      const convertValues = await this.ConverterUtilService.getCurrencyValue();
      this.setState({
        inputItems: [
          { key: convertValues.USD, text: 'USD' },
          { key: convertValues.AUD, text: 'AUD' },
          { key: convertValues.PLN, text: 'PLN' },
          { key: convertValues.BYN, text: 'BYN' },
          { key: convertValues.RUB, text: 'RUB' }
        ],
      })
    } catch (e) {
      this.setState(
        {
          errorMessage: e.message,
        }
      )
    }
  }


  public async componentDidMount(): Promise<void> {
    await this.loadData();
  }


  onChangeHandler(_: any, event: IDropdownOption) {
    console.log("selected value from dropdown ", event.text);
    this.setState({
      selectedCurrency: event.text,
      selectedRate: Number(event.key),
    });
  }


  onChangeTextField(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
    const userValue = parseFloat(newValue);
    const convertUSD = userValue / this.state.selectedRate;
    this.setState({
      userValue: userValue,
      result: convertUSD,
    });
  }

  public render(): React.ReactElement<IConverterUtilProps> {


    return (
      <div>
        <section>
          <Dropdown
            className={styles.dropDown}
            options={this.state.inputItems}
            placeholder="Select"
            onChange={this.onChangeHandler.bind(this)}
          />
        </section>
        
        {this.state.selectedRate}<br />

        <TextField
          onChange={this.onChangeTextField.bind(this)}
          className={styles.textField}
        />
        {this.state.result} <strong>USD</strong>

      </div>
    );
  }
}
