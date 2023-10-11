export interface dataTypes {
  name: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}

export interface dataObjectType {
  data: dataTypes;
}

export interface stateTypes {
  data: dataTypes;
  setData: React.Dispatch<React.SetStateAction<dataTypes>>;
  setShowCardInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowThanksPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface errorTypes {
  charactersOnly: boolean;
  numbersOnly: boolean;
  cannotBeEmpty: boolean;
}
