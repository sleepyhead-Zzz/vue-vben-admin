import type { Router } from 'vue-router';

import { h } from 'vue';

import { Modal } from 'ant-design-vue';

interface JobSubmitLike {
  runId?: string;
  status?: string;
  taskId?: number | string;
  workflowId?: string;
}

interface ResponseLike {
  code?: number;
  data?: any;
  message?: string;
}

function normalizeJobSubmitData(data: unknown): JobSubmitLike {
  if (!data || typeof data !== 'object') {
    return {};
  }
  return data as JobSubmitLike;
}

export function showJobTaskSubmitFeedback(
  response: ResponseLike,
  router: Router,
) {
  if (response?.code !== 200) {
    Modal.error({
      title: '任务提交失败',
      content: response?.message || '任务提交失败',
    });
    return;
  }

  const job = normalizeJobSubmitData(response?.data);

  Modal.info({
    title: '任务已提交',
    okText: '去任务管理',
    onOk: () => router.push('/system/job-task'),
    width: 560,
    content: h('div', { class: 'space-y-2 text-sm' }, [
      h('div', [`任务ID：${job.taskId ?? '-'}`]),
      h('div', [`workflowId：${job.workflowId ?? '-'}`]),
      h('div', [`runId：${job.runId ?? '-'}`]),
      h('div', [`状态：${job.status ?? '-'}`]),
      h(
        'div',
        {
          class:
            'mt-2 rounded border border-blue-200 bg-blue-50 p-2 text-blue-700',
        },
        '请到 系统管理 > 任务管理 查看执行进度与明细日志',
      ),
    ]),
  });
}

export function showJobTaskSubmitError(error: unknown) {
  const message =
    typeof error === 'object' && error && 'message' in error
      ? String((error as { message?: string }).message || '')
      : '';
  Modal.error({
    title: '任务提交失败',
    content: message || '任务提交失败',
  });
}
