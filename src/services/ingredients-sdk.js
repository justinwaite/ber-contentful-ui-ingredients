import shortid from "shortid";
import { fromJS, isImmutable } from "immutable";

class IngredientsSdk {
  constructor(contentfulSdk) {
    this.contentfulSdk = contentfulSdk;
  }

  addGroup = () => {
    const currValue = this._getCurrentValue();
    this._setValue(currValue.push(createGroup()));
  };

  deleteGroup = ({ id }) => {
    const groups = this._getCurrentValue();
    const index = groups.findIndex(group => group.get("id") === id);
    this._setValue(groups.delete(index));
  };

  getInitialValue = () => {
    let currValue = this.contentfulSdk.field.getValue();
    if (!currValue || !Array.isArray(currValue) || !currValue.length) {
      currValue = [createGroup()];
      this._setValue(currValue);
    }
    return currValue;
  };

  onChange = callback => this.contentfulSdk.field.onValueChanged(callback);

  setGroupName = ({ groupId, name }) => {
    const groups = this._getCurrentValue();
    const index = groups.findIndex(group => group.get("id") === groupId);
    this._setValue(groups.setIn([index, "name"], name));
  };

  _getCurrentValue = () => {
    return fromJS(this.contentfulSdk.field.getValue());
  };

  _setValue = value => {
    if (isImmutable(value)) {
      value = value.toJS();
    }

    this.contentfulSdk.field.setValue(value);
  };
}

function createGroup() {
  return {
    id: shortid.generate(),
    name: "",
    ingredientList: []
  };
}

export default IngredientsSdk;
