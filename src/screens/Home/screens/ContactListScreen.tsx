import {FC, useCallback, useEffect} from 'react';
import useUserList from '../hooks/useUserList';
import {RefreshControl} from 'react-native';
import {IUser} from '@models/users/user.type';
import UserItem from '../components/UserItem';
import CommonStyles from '@screens/styles';
import BaseFlatlist from '@components/atoms/FlatList/BaseFlatlist';
import {Screen} from '@navigation/navigation.enums';
import navigationService from '@services/navigationService';
import {TVoidCallbackId} from '@utils/typeUtils';
import {Divider} from '@rneui/themed';
import {t} from 'i18next';

const ContactListScreen: FC<any> = () => {
  const {
    computedLoading,
    computedIsEnd,
    userPaginateData,

    handleRefresh,
    handleNextPage,
  } = useUserList();

  useEffect(() => {
    handleRefresh();
  }, []);

  const navigateToDetail: TVoidCallbackId = useCallback(
    (_id: number | string, userName: String) => {
      navigationService.navigate(
        Screen.ContactDetailScreen,
        {
          userId: _id,
          userName,
        },
        'ContactDetailScreen',
      );
    },
    [],
  );

  const toastCopied = useCallback(() => {
    global.props.showToast(t('common:copied'));
  }, []);

  const renderItem = useCallback(({item}: {item: IUser}) => {
    return (
      <UserItem
        user={item}
        navigateToDetail={navigateToDetail}
        onCopied={toastCopied}
      />
    );
  }, []);

  return (
    <BaseFlatlist
      contentContainerStyle={CommonStyles.view.viewLayout}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
      ItemSeparatorComponent={
        <Divider style={CommonStyles.space.dividerVertical} />
      }
      data={userPaginateData?.data ?? []}
      keyExtractor={(item: any) => item.id}
      isLoading={computedLoading}
      isEnd={computedIsEnd}
      onEndReached={handleNextPage}
      renderItem={renderItem}
      onRefresh={handleRefresh}
    />
  );
};

export default ContactListScreen;
