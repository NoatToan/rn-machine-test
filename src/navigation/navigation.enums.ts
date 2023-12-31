export enum Screen {
  IntroScreen = 'IntroScreen',
  // Auth
  Auth = 'Auth',
  Login = 'Login',

  HomeScreen = 'HomeScreen',

  //
  ContactListScreen = 'HOME_ContactListScreen',
  ContactDetailScreen = 'HOME_ContactDetailScreen',
  ContactCreateScreen = 'HOME_ContactCreateScreen',
}

export type RootStackParamList = {
  HomeScreen: undefined;
  NotFound: undefined;

  ContactListScreen: undefined;
  ContactDetailScreen: {
    userId: number;
    screenTitle: string;
    isCreate?: boolean;
  };
  // Feed: {sort: 'latest' | 'top'} | undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
