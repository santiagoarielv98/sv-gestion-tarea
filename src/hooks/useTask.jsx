import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDialog } from '@/contexts/dialog';
import { useDialogConfirm } from '@/contexts/dialog/confirm';
import LabelAutoComplete from '@/features/labels/components/LabelAutoComplete';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleTaskMutation,
  useUpdateTaskMutation
} from '@/features/tasks/taskApi';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import * as Yup from 'yup';

const taskValidationSchema = Yup.object().shape({
  title: Yup.string().max(255).required('Title is required'),
  desc: Yup.string().optional().default(undefined),
  dueDate: Yup.date()
    .required('Due Date is required')
    .default(() => moment()),
  labels: Yup.array().of(Yup.object().shape({ _id: Yup.string(), title: Yup.string() })),
  priority: Yup.string().oneOf(['low', 'medium', 'high', 'urgent']).default('medium'),
  completed: Yup.boolean().default(false)
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

  const openTask = (task) => {
    openDialog({
      title: task?._id ? 'Edit Task' : 'Add Task',
      contentText: task?.description,
      validationSchema: taskValidationSchema,
      onSubmit: async (values) => {
        const labels = values.labels.map((label) => label._id);
        const dueDate = values.dueDate?.toISOString();
        if (task?._id) {
          await updateTask({ ...task, ...values, dueDate, labels });
        } else {
          await createTask({ ...values, dueDate, labels });
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
                    onConfirm: () => {
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
              onConfirm: () => {
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
        labels: {
          label: 'Labels',
          initialValue: task?.labels || [],
          component: LabelAutoComplete
        }
      }
    });
  };

  return { openTask, tasks, toggleTask, isLoadingToggle };
}

export default useTask;
