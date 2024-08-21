import isEqual from 'lodash/isEqual';
import moment from 'moment';
import * as Yup from 'yup';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useDialog } from '@/features/dialog/hooks/useDialog';
import { useDialogConfirm } from '@/features/dialog/hooks/useDialogConfirm';
import LabelAutoComplete from '@/features/labels/components/LabelAutoComplete';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleTaskMutation,
  useUpdateTaskMutation
} from '@/features/tasks/taskApi';
import type { Task } from '@/features/tasks/types/task';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

const taskValidationSchema = Yup.object().shape({
  title: Yup.string().max(255).required('Title is required'),
  desc: Yup.string().optional(),
  dueDate: Yup.date().required('Due Date is required'),
  tags: Yup.array().of(Yup.object().shape({ _id: Yup.string(), title: Yup.string() })),
  priority: Yup.string().oneOf(['low', 'medium', 'high', 'urgent']),
  completed: Yup.boolean()
});

const priorities = [
  {
    value: 'low',
    label: 'Low'
  },
  {
    value: 'medium',
    label: 'Medium'
  },
  {
    value: 'high',
    label: 'High'
  },
  {
    value: 'urgent',
    label: 'Urgent'
  }
];

function useTask() {
  const [deleteTask] = useDeleteTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [toggleTask, { isLoading: isLoadingToggle }] = useToggleTaskMutation();
  const { data: tasks = [] } = useGetTasksQuery();
  const { openDialog, closeDialog } = useDialog();
  const { openDialogConfirm } = useDialogConfirm();

  const openTask = (task?: Task) => {
    openDialog({
      title: task?._id ? 'Edit Task' : 'Add Task',
      validationSchema: taskValidationSchema,
      onSubmit: async (values: Yup.InferType<typeof taskValidationSchema>) => {
        const tags = values.tags?.map((label) => label._id!) ?? [];
        const dueDate = values.dueDate?.toISOString();
        if (task?._id) {
          await updateTask({ _id: task._id!, ...values, dueDate, tags });
        } else {
          await createTask({ ...values, dueDate, tags });
        }
      },
      slots: {
        dialogActionsProps: {
          ...(task?._id && {
            children: (
              <IconButton
                sx={{
                  bgcolor: 'error.main',
                  color: 'error.contrastText',
                  '&:hover': {
                    bgcolor: 'error.dark'
                  }
                }}
                onClick={() => {
                  openDialogConfirm({
                    dialogProps: {
                      maxWidth: 'xs'
                    },
                    title: 'Delete Task?',
                    contentText: (
                      <>
                        Are you sure you want to delete the task <strong>{task?.title}</strong>?
                      </>
                    ),
                    onConfirm: async () => {
                      deleteTask(task?._id);
                      closeDialog();
                    }
                  });
                }}
              >
                <DeleteOutlined />
              </IconButton>
            )
          })
        }
      },
      dialogProps: {
        onClose: (formik) => {
          if (isEqual(formik.values, formik.initialValues)) {
            closeDialog();
          }
          if (!formik.isSubmitting && formik.dirty) {
            openDialogConfirm({
              dialogProps: {
                maxWidth: 'xs'
              },
              title: 'Discard Changes?',
              contentText: 'You have unsaved changes. Are you sure you want to discard them?',
              onConfirm: async () => {
                closeDialog();
              }
            });
          }
        }
      },
      fields: {
        title: {
          label: 'Title',
          initialValue: task?.title,
          fieldProps: {
            autoFocus: task?._id ? false : true,
            required: true
          }
        },
        desc: {
          label: 'Description',
          initialValue: task?.desc || '',
          fieldProps: {
            multiline: true,
            minRows: 3,
            maxRows: 5,
            size: 'small'
          }
        },
        dueDate: {
          label: 'Due Date',
          initialValue: task?.dueDate ? moment(task?.dueDate) : moment(),
          gridProps: {
            md: 6
          },
          component: DatePicker,
          onChange: (setFieldValue) => (date) => {
            setFieldValue('dueDate', date);
          }
        },
        priority: {
          label: 'Priority',
          initialValue: task?.priority || 'low',
          gridProps: {
            md: 6
          },
          fieldProps: {
            select: true,
            children: priorities.map((priority) => (
              <MenuItem key={priority.value} value={priority.value}>
                {priority.label}
              </MenuItem>
            ))
          }
        },
        tags: {
          label: 'Labels',
          initialValue: task?.tags || [],
          component: LabelAutoComplete
        }
      }
    });
  };

  return { openTask, tasks, toggleTask, isLoadingToggle };
}

export default useTask;
