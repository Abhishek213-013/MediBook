// src/components/CleanBodyAttributes.tsx
"use client";

import { useEffect } from "react";

export default function CleanBodyAttributes() {
  useEffect(() => {
    // Function to clean extension attributes
    const cleanAttributes = () => {
      // Remove the specific attributes mentioned in the error
      document.body.removeAttribute("data-new-gr-c-s-check-loaded");
      document.body.removeAttribute("data-gr-ext-installed");
      
      // Remove any other Grammarly-related attributes
      const attributesToRemove = [];
      for (let i = 0; i < document.body.attributes.length; i++) {
        const attr = document.body.attributes[i];
        if (attr.name.includes('gr-') || attr.name.includes('grammarly')) {
          attributesToRemove.push(attr.name);
        }
      }
      
      attributesToRemove.forEach(attrName => {
        document.body.removeAttribute(attrName);
      });
    };

    // Clean immediately and also after a short delay to catch any late-added attributes
    cleanAttributes();
    const timer = setTimeout(cleanAttributes, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}