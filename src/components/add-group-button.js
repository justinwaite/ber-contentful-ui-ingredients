import React, { useContext } from "react";
import { Button } from "@contentful/forma-36-react-components";
import ContentfulSdkContext from "../contexts/contentful-sdk.context";

function AddGroupButton(props) {
  const { ingredientsSdk } = useContext(ContentfulSdkContext);

  const addGroup = () => ingredientsSdk.addGroup();

  return (
    <Button onClick={addGroup} {...props}>
      Add group
    </Button>
  );
}

export default AddGroupButton;
