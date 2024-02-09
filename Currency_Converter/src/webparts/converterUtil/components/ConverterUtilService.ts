import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ICurrencyRates } from "./ICurrencyRates";



export default class ConverterUtilService {
  constructor(webPartContext: WebPartContext) {
    this.context = webPartContext
  }

  private context: WebPartContext;

  public async getCurrencyValue(): Promise<ICurrencyRates> {

    const responce = await fetch("https://v6.exchangerate-api.com/v6/d00346df650a9ca405046904/latest/USD"
    );
    if (responce.ok) {
      const resultJson = await responce.json();

      console.log(resultJson)
      const conversionRates = resultJson.conversion_rates as ICurrencyRates;

      return conversionRates;
    } else {
      const responceText = await responce.text();
      throw new Error(responceText);
    }
  }
}