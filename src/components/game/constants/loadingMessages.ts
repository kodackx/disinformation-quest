import { useTranslation } from 'react-i18next';

const MESSAGES_PER_ACTION = 4;
const MESSAGE_DURATION = 1500;

export const useLoadingMessages = () => {
  const { t } = useTranslation();

  const getMessagesForAction = (actionKey: string) => {
    return Array.from({ length: MESSAGES_PER_ACTION }, (_, i) => ({
      action: t(`loadingMessages.${actionKey}.${i}`),
      duration: MESSAGE_DURATION
    }));
  };

  return {
    getMessagesForChoice: (loadingMessageKey: string) => {
      return getMessagesForAction(loadingMessageKey || 'default');
    }
  };
};
