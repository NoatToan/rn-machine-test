import {Button} from '@rneui/base';
import {ButtonProps} from '@rneui/themed';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

const BaseButton: FC<ButtonProps> = ({
  title = 'Button',
  color = 'primary',
  ...args
}) => {
  return (
    <Button
      size="lg"
      title={title}
      color={color}
      {...args}
      containerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 99,
    minWidth: scale(100),
  },
});
export default React.memo(BaseButton);
