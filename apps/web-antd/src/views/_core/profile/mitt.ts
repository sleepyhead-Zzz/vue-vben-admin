import { mitt } from '@vben/utils';

type Events = {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  updateProfile: void;
};

export const emitter = mitt<Events>();
