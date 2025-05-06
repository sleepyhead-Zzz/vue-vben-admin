import { defineComponent, h } from 'vue';

import { omit } from 'lodash-es';
import { buttonProps, NButton } from 'naive-ui';

/**
 * 表格操作列按钮专用
 */
export const GhostButton = defineComponent({
  name: 'GhostButton',
  props: omit(buttonProps, ['size']),
  setup(props, { attrs, slots }) {
    // 返回一个虚拟 DOM 节点，使用 NButton 组件
    return () =>
      h(
        NButton,
        {
          ...props, // 保留外部传入的 props
          ...attrs, // 保留传递的额外属性
          ghost: true, // 强制设置为 ghost 样式
          size: 'small', // 强制设置按钮大小为 small
          // 如果传入了 type，就使用传入的 type；否则使用默认值 'default'
          type: props.type || 'default',
        },
        slots, // 渲染插槽内容
      );
  },
});
