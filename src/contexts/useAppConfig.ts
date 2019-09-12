import { useContext, createContext } from 'react';
import { AppConfig } from 'src/typings';

const appConfigDefaults = {
  name: '',
  version:'',
  config: {},
};

const AppConfigContext = createContext(<AppConfig> appConfigDefaults);

export const AppConfigProvider = AppConfigContext.Provider;

export const useAppConfig = () => {
  const appConfig = useContext(AppConfigContext);
  if (!appConfig) throw new Error('Can\'t create "UseAppConfig"');

  return appConfig;
};
