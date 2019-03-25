import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Card, TextInput } from "@contentful/forma-36-react-components";
import ContentfulSdkContext from "../contexts/contentful-sdk.context";

GroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    ingredientList: PropTypes.array,
    name: PropTypes.string
  })
};

function GroupCard({ group: { id, ingredientList, name } }) {
  const { ingredientsSdk } = useContext(ContentfulSdkContext);

  const deleteGroup = () => {
    ingredientsSdk.deleteGroup({ id });
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <TextInput
        onChange={ev =>
          ingredientsSdk.setGroupName({ groupId: id, name: ev.target.value })
        }
        placeholder="Group name"
        style={{ marginBottom: "1rem" }}
        value={name}
      />
      <Button buttonType="negative" onClick={deleteGroup}>
        Delete Group
      </Button>
    </Card>
  );
}

export default GroupCard;
