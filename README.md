# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### For Android

```bash
# using npm
npm install && npm run android

# OR using Yarn
yarn && yarn android
```

### For iOS

```bash
# using npm
npm install && npm run ios

# OR using Yarn
yarn && yarn ios
```

# Overview feature:
- 1. Listing the contacts
- 2. Update the contacts
- 3. Delete the contacts


# Requirement
### Task 1: React Native Components
- ✅ ListScreen.js: component displays a list of items fetched from an API endpoint
- ✅ DetailScreen.js: component displays details of a selected item when clicked from the list
- ✅ Show detail formation and relevant stuffs.
- ✅ App.js implement navigation system using React Navigation

### Task 2: State Management
- ✅ ListScreen.js: implement a state management solution to handle loading and error states while fetching
- ✅ DetailScreen.js: Implement a state management solution to manage the selected's items.

### Task 3: Styling
- ✅ ListScreen.js and DetailScreen.js: Style the components using Flexbox, apply basic Styling


### Task 4: Bonus Task (Optional)
- ✅ Implement pull-to-refresh on the ListScreen
- [ ] Add a search bar to filter items on the ListScreen
- [ ] Add some additional filter options
- [ ] Create a new screen for adding new items.
- ✅ Instead of mock data, you can use your own backend with SQL database or NOSQL database.

### Better TODO:
- ✅ MVVM - MVP architecture with DDD approach
- ✅ Atomics design
- ✅ Navigation service to use outside context
- ✅ Debug view for development
- ✅ Handle theme provider 
- [ ] Handle theme provider from rneui for StyleSheet
- ✅ Separate basic env
- ✅ Base Form Item
- [ ] Form items validation utils
- [ ] Splash screen
- ✅ Eslint, Prettier
- ✅ Babel alias config
- ✅ Global props
- ✅ Localization by namespace
- ✅ Setup Redux and Redux Persist store 

# Follow MVVM - MVP for this project:

- Model: Our store reducers slice, slice.api
- View: Components in Screen, View
- ViewModel:
>> Custom hook by actor/model (useUserViewModel)
>> This view model will hold whole of logic of the actor/model
- Presenter/Controller: Create custom hook for each View, Screen. Then use in specific View, Screen


# Project DDD structure:
> Here, we focus on structure project as unit of features.
> Then we can easy to develop new features or clone our features skeleton to new project.

```
├── src
│   ├── assets
│   ├── components
│   ├── i18n
│   ├── layouts
│   ├── models
│   ├── navigation
│   ├── redux
│   ├── screens
│   ├── ├── Home
│   ├── ├── ├── components
│   ├── ├── ├── hooks
│   ├── ├── ├── screens
│   ├── ├── ├── ├── ContactCreateScreen.tsx
│   ├── ├── ├── ├── ContactDetailScreen.tsx
│   ├── ├── ├── ├── ContactListScreen.tsx
│   ├── ├── ├── views
│   ├── ├── ├── HomeScreen.tsx
│   ├── ├── Intro
│   ├── ├── ├── components
│   ├── ├── ├── hooks
│   ├── ├── ├── screens
│   ├── ├── ├── views
│   ├── ├── ├── IntroScreen.tsx
│   ├── ├── Other features...
│   ├── services
│   ├── utils
│   ├── views
│   ├── model
│   ├── index.js
└── ...
```