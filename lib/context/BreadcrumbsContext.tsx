"use client";

import { createContext, useContext, useState } from "react";

interface BreadcrumbsContextType {
  breadcrumbs: { [key: string]: string };
  setBreadcrumb: (key: string, value: string) => void;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(undefined);

export const BreadcrumbsProvider = ({ children }: { children: React.ReactNode }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<{ [key: string]: string }>({});

  const setBreadcrumb = (key: string, value: string) => {
    setBreadcrumbs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumb }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
  }
  return context;
};
