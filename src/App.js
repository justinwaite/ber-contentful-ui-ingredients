import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "@contentful/forma-36-react-components/dist/styles.css";
import ContentfulSdkContext from "./contexts/contentful-sdk.context";
import styled from "styled-components";
import GroupCard from "./components/group-card";
import AddGroupButton from "./components/add-group-button";

const Container = styled.div`
  padding: 1rem;
`;

function App() {
  const groups = useFieldValue();

  return (
    <Container>
      {groups &&
        groups.map(group => <GroupCard key={group.id} group={group} />)}
      <AddGroupButton>Add group</AddGroupButton>
    </Container>
  );
}

function useFieldValue() {
  const [fieldValue, setFieldValueState] = useState([]);
  const { ingredientsSdk } = useContext(ContentfulSdkContext);

  useEffect(() => {
    const unsubscribe = ingredientsSdk.onChange(value => {
      setFieldValueState(value);
    });

    setFieldValueState(ingredientsSdk.getInitialValue());

    return () => {
      unsubscribe();
    };
  }, []);

  return fieldValue;
}

export default App;
