import {RootStackParamList, Screen} from '@navigation/navigation.enums';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {FC, useCallback, useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import useUserDetail from '../hooks/useUserDetail';
import Avatar from '@components/atoms/Avatar/Avatar';
import CommonStyles from '@screens/styles';
import {useForm} from 'react-hook-form';
import FormUtils from '@utils/formUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormItemEditModeController from '@components/atoms/Form/FormItemEditModeController';
import BaseButton from '@components/atoms/Button/BaseButton';
import {scale} from '@utils/mixins';
import navigationService from '@services/navigationService';
import {t} from 'i18next';

/*
  We ultilize the screen for edit,create,detail
*/
const ContactDetailScreen: FC<any> = () => {
  const {
    params: {userId, isCreate},
  } = useRoute<RouteProp<RootStackParamList, 'ContactDetailScreen'>>();

  const {
    computedLoading,
    userDetail,

    handleGetUserDetail,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser,
  } = useUserDetail();

  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors, isDirty},
  } = useForm({
    reValidateMode: 'onSubmit',
    values: userDetail,
  });

  const INPUT_ITEMS = React.useMemo(
    () =>
      [
        FormUtils.generateInputConfig({
          name: 'first_name',
          label: t(`user:labels.first_name`),
          rules: {
            required: t('validation:required', {
              key: t(`user:labels.first_name`),
            }),
          },
        }),
        FormUtils.generateInputConfig({
          name: 'last_name',
          label: t(`user:labels.last_name`),
          rules: {
            required: t('validation:required', {
              key: t(`user:labels.last_name`),
            }),
          },
        }),
        !isCreate
          ? {
              ...FormUtils.generateInputConfig({
                name: 'phone_number',
                label: t(`user:labels.phone_number`),
                rules: {
                  required: t('validation:required', {
                    key: t(`user:labels.phone_number`),
                  }),
                },
                editAble: false,
              }),
            }
          : null,
        FormUtils.generateInputConfig({
          name: 'description',
          label: t(`user:labels.description`),
          rules: {required: t('validation:required', {key: 'description'})},
        }),
      ].filter(i => i),
    [],
  );

  const onSubmit = (data: any) => {
    if (!isDirty) {
      navigationService.navigateAndReset(Screen.ContactListScreen);
      global.props.showToast(t('common:youDoNothing'));
      return;
    }
    if (isCreate) {
      handleCreateUser(data, {
        onSuccess: () => {
          global.props.showToast(t('common:success'));
          navigationService.navigate(Screen.ContactListScreen);
        },
        onError: message => {
          global.props.showToast(message);
          navigationService.navigate(Screen.ContactListScreen);
        },
      });
      return;
    }
    handleUpdateUser(userId, data, {
      onSuccess: () => {
        global.props.showToast(t('common:success'));
        navigationService.navigateAndReset(Screen.ContactListScreen);
      },
      onError: message => {
        console.log('message', message);
        global.props.showToast(message);
        navigationService.navigateAndReset(Screen.ContactListScreen);
      },
    });
  };

  const onInvalid = useCallback(() => {
    if (isDirty) {
      return;
    }

    navigationService.goBack();
    global.props.showToast(t('common:youDoNothing'));
  }, [isDirty]);

  const onDeleteUser = useCallback(() => {
    handleDeleteUser(userId, {
      onSuccess: message => {
        global.props.showToast(message ?? t('common:success'));
        navigationService.goBack();
      },
      onError: message => {
        global.props.showToast(message ?? t('common:error'));
        navigationService.goBack();
      },
    });
  }, [userId]);

  useEffect(() => {
    if (!isCreate) {
      handleGetUserDetail({userId});
    }
  }, [userId, isCreate]);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}>
      <View style={styles.containerAvatar}>
        <Avatar
          size={171}
          source={{uri: userDetail?.main_profile_image?.path}}
        />
      </View>
      <View style={styles.containerInfo}>
        {INPUT_ITEMS.map((input: any) => {
          return (
            <FormItemEditModeController
              key={input?.name}
              name={input?.name}
              label={input?.label}
              control={control}
              errors={errors}
              style={styles.input}
              rules={input?.rules}
              value={getValues(input?.name)}
              editAble={input?.editAble ?? true}
              isEditActive={isCreate}
            />
          );
        })}
      </View>

      <View style={styles.containerActions}>
        {!isCreate && (
          <BaseButton
            loading={computedLoading}
            disabled={computedLoading}
            title={t('common:delete')}
            color="error"
            onPress={onDeleteUser}
          />
        )}
        <BaseButton
          disabled={computedLoading || !isDirty}
          loading={computedLoading}
          title={t('common:save')}
          color={'primary'}
          onPress={handleSubmit(onSubmit, onInvalid)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  containerAvatar: {
    marginTop: scale(10),
    alignSelf: 'center',
  },
  containerInfo: {
    ...CommonStyles.view.viewLayout,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 4,
    color: 'black',
  },
  containerActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(20),
    margin: scale(20),
  },
});

export default React.memo(ContactDetailScreen);
