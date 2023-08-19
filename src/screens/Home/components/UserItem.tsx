import Avatar from '@components/atoms/Avatar/Avatar';
import {IUser} from '@models/users/user.type';
import {Text} from '@rneui/base';
import {joinText} from '@utils/stringUtils';
import {
  TVoidCallback,
  TVoidCallbackId,
  VoidCallBack,
  VoidCallBackId,
} from '@utils/typeUtils';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Clipboard} from 'react-native';
import {scale} from '@utils/mixins';
interface Props {
  user: IUser;
  navigateToDetail: TVoidCallbackId;
  onCopied: TVoidCallback;
}
const UserItem = ({
  user,
  navigateToDetail = VoidCallBackId,
  onCopied = VoidCallBack,
}: Props) => {
  const handleNavigate = useCallback(() => {
    navigateToDetail(user.id, joinText(user.first_name, user.last_name));
  }, [user.id]);

  const copyPhoneToClipboard = useCallback(() => {
    if (user?.phone_number) {
      Clipboard?.setString(user.phone_number);
    }
    onCopied();
  }, [user.phone_number]);

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={styles.containerInfo}
      activeOpacity={0.8}>
      <View style={styles.containerAvatar}>
        <Avatar source={{uri: user?.main_profile_image?.path}} />
      </View>

      <View style={styles.containerInfoDetail}>
        <Text numberOfLines={1} h4>
          {joinText(user?.first_name, user?.last_name)}
        </Text>
        <Text numberOfLines={2}>{joinText(user?.description)}</Text>
        <TouchableOpacity onPress={copyPhoneToClipboard}>
          <Text numberOfLines={1} h4>
            {user?.phone_number}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerInfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerAvatar: {
    marginRight: scale(10),
    display: 'flex',
    justifyContent: 'center',
  },
  containerInfoDetail: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  goToDetailBtn: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default React.memo(UserItem);
