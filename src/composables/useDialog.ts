import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

export default function useDialog() {
  const $q = useQuasar();
  const { t } = useI18n();

  const confirm = (title?: string, message?: string) => {
    return $q.dialog({
      title: title ?? t('confirm.title'),
      message: `<span style="color: #7b8190">${
        message ?? t('confirm.question')
      }</span>`,
      html: true,
      cancel: {
        text: t('confirm.cancel'),
        color: 'warning',
        outline: true,
        icon: 'o_close',
        flat: true,
      },
      ok: {
        label: t('confirm.ok'),
        color: 'accent',
        outline: true,
        icon: 'o_check',
        flat: true,
      },
      persistent: true,
    });
  };

  return {
    confirm,
  };
}
