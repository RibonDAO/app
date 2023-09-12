import {
  createContext,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export interface IUtmContext {
  utmSource: string | undefined;
  utmMedium: string | undefined;
  utmCampaign: string | undefined;
  setUtmSource: (id: SetStateAction<string | undefined>) => void;
  setUtmMedium: (id: SetStateAction<string | undefined>) => void;
  setUtmCampaign: (id: SetStateAction<string | undefined>) => void;
  setUtm: (utmSource: string, utmMedium: string, utmCampaign: string) => void;
}

export const UtmContext = createContext<IUtmContext>({} as IUtmContext);

function UtmProvider({ children }: any) {
  const [utmSource, setUtmSource] = useState<string>();
  const [utmMedium, setUtmMedium] = useState<string>();
  const [utmCampaign, setUtmCampaign] = useState<string>();

  function setUtm(
    utmParamsSource: string,
    utmParamsMedium: string,
    utmParamsCampaign: string,
  ) {
    setUtmSource(utmParamsSource);
    setUtmMedium(utmParamsMedium);
    setUtmCampaign(utmParamsCampaign);
  }

  const utmObject: IUtmContext = useMemo(
    () => ({
      utmSource,
      utmMedium,
      utmCampaign,
      setUtmSource,
      setUtmMedium,
      setUtmCampaign,
      setUtm,
    }),
    [utmSource, utmMedium, utmCampaign],
  );

  return (
    <UtmContext.Provider value={utmObject}>{children}</UtmContext.Provider>
  );
}

export default UtmProvider;

export function useUtmContext() {
  const context = useContext(UtmContext);

  if (!context) {
    throw new Error("useUtmContext must be used within a UtmProvider");
  }

  return context;
}
