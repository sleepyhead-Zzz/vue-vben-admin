import { defineComponent, h } from 'vue';

import { omit } from 'lodash-es';
import { buttonProps, NButton } from 'naive-ui';

/**
 * 表格操作列按钮专用
 */
export const GhostButton = defineComponent({
  name: 'GhostButton',
  props: omit(buttonProps, ['type', 'ghost', 'size']), // 直接传递 `buttonProps` 对象
  setup(props, { attrs, slots }) {
    // 返回一个虚拟 DOM 节点，使用 NButton 组件
    return () =>
      h(
        NButton,
        {
          ...props, // 保留传递的 props
          ...attrs, // 保留传递的额外属性
          type: 'primary', // 强制设置按钮类型为 primary
          ghost: true, // 强制设置按钮样式为 ghost
          size: 'small', // 强制设置按钮大小为 small
        },
        slots, // 渲染插槽内容
      );
  },
});
