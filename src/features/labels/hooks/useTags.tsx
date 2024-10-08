import isEqual from 'lodash/isEqual';
import * as Yup from 'yup';

import IconButton from '@mui/material/IconButton';

import {
  useCreateLabelMutation,
  useDeleteLabelMutation,
  useGetLabelsQuery,
  useUpdateLabelMutation
} from '@/features/labels/labelApi';
import type { Tag } from '@/features/labels/types/tag';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

import { useDialog } from '../../dialog/hooks/useDialog';
import { useDialogConfirm } from '../../dialog/hooks/useDialogConfirm';

const tagValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required')
});

function useTags() {
  const { data: tags = [] } = useGetLabelsQuery();
  const [createLabel] = useCreateLabelMutation();
  const [deleteLabel] = useDeleteLabelMutation();
  const [updateLabel] = useUpdateLabelMutation();
  const { openDialog, closeDialog } = useDialog();
  const { openDialogConfirm } = useDialogConfirm();

  const openTag = (tag?: Tag) => {
    const isEdit = Boolean(tag?._id);
    openDialog({
      title: isEdit ? 'Edit Tag' : 'Add Tag',
      validationSchema: tagValidationSchema,
      onSubmit: async (values: Yup.InferType<typeof tagValidationSchema>) => {
        if (isEdit) {
          await updateLabel({ ...tag!, ...values });
        } else {
          await createLabel({ ...values });
        }
      },
      slots: {
        dialogActionsProps: {
          ...(isEdit && {
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
                        Are you sure you want to delete the task <strong>{tag!.title}</strong>?
                      </>
                    ),
                    onConfirm: async () => {
                      deleteLabel(tag!._id);
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
          initialValue: tag?.title,
          fieldProps: {
            autoFocus: tag?._id ? false : true,
            required: true
          }
        }
      }
    });
  };
  return { tags, openTag };
}

export default useTags;
