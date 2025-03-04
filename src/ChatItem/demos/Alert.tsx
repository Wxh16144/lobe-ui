import { ChatItem, ChatItemProps, StroyBook, useControls, useCreateStore } from '@lobehub/ui';

import { avatar } from './data';

export default () => {
  const store = useCreateStore();
  const control: ChatItemProps['error'] | any = useControls(
    {
      description: '',
      message: 'Error',
      type: {
        options: ['success', 'info', 'warning', 'error'],
        value: 'error',
      },
    },
    { store },
  );

  return (
    <StroyBook levaStore={store}>
      <ChatItem avatar={avatar} error={control} />
    </StroyBook>
  );
};
