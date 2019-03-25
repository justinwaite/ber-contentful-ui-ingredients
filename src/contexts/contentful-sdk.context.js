import React, { createContext, useEffect, useState } from "react";
import { initSdk } from "../services/contentful-sdk";
import IngredientsSdk from "../services/ingredients-sdk";

const defaultValue = { contentfulSdk: null, ingredientsSdk: null };
const ContentfulSdkContext = createContext(defaultValue);

export function ContentfulSdkProvider({ children }) {
  const [state, setState] = useState({
    contentfulSdk: null,
    ingredientsSdk: null,
    ready: false
  });

  useEffect(() => {
    initSdk().then(contentfulSdk => {
      const ingredientsSdk = new IngredientsSdk(contentfulSdk);
      setState({ contentfulSdk, ingredientsSdk, ready: true });
      contentfulSdk.window.startAutoResizer();
    });
  }, []);

  const { contentfulSdk, ingredientsSdk, ready } = state;

  return (
    <ContentfulSdkContext.Provider value={{ contentfulSdk, ingredientsSdk }}>
      {!ready && "Loading..."}
      {ready && children}
    </ContentfulSdkContext.Provider>
  );
}

export default ContentfulSdkContext;
