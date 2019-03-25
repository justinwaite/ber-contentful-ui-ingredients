let fieldValue = {};
let fieldCallback = null;

function setFieldValue(value) {
  fieldValue = value;
  fieldCallback && fieldCallback(fieldValue);
}

const mockSdk = {
  window: {
    startAutoResizer: () => {
      console.log("sdk:startAutoResizer");
    }
  },
  field: {
    getValue: () => {
      return fieldValue;
    },
    setValue: value => {
      console.log("sdk:setValue", value);
      return new Promise(resolve => {
        setFieldValue(value);
        resolve(value);
      });
    },
    onValueChanged: callback => (fieldCallback = callback)
  }
};

export default mockSdk;
