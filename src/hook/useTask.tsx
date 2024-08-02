import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import type { Label } from "../redux/labels/labelThunk"
import { addTask, updateTask } from "../redux/tasks/taskThunk"
import {
  selectTaskState,
  setConfirmOpen,
  setModalOpen,
} from "../redux/tasks/taskSlice"
import { selectLabelState } from "../redux/labels/labelSlice"
import _ from "lodash"

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Max 100 characters"),
  description: Yup.string().max(500, "Max 1000 characters"),
  completed: Yup.boolean(),
  labels: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      name: Yup.string(),
      color: Yup.string(),
    }),
  ),
  dueDate: Yup.date(),
  priority: Yup.number().min(1).max(5),
})

type InitialValues = {
  title: string
  description: string
  completed: boolean
  labels: Label[]
  dueDate: string
  priority: number
}

const defaultValues: InitialValues = {
  title: "",
  description: "",
  completed: false,
  labels: [],
  dueDate: "",
  priority: 2,
}

function useTask() {
  const dispatch = useAppDispatch()

  const { currentTask, loading } = useAppSelector(selectTaskState)
  const { labels } = useAppSelector(selectLabelState)

  const initialValues: InitialValues = currentTask
    ? {
        ...currentTask,
        priority: 2,
        labels: labels.filter(label => currentTask?.labels.includes(label.id)),
      }
    : defaultValues

  const formik = useFormik<InitialValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      if (currentTask?.id) {
        dispatch(
          updateTask({
            id: currentTask.id,
            title: values.title,
            description: values.description,
            completed: values.completed,
            labels: values.labels.map(label => label.id),
            dueDate: values.dueDate.toString(),
          }),
        ).then(() => {
          formik.resetForm()
        })
        return
      } else {
        dispatch(
          addTask({
            title: values.title,
            description: values.description,
            completed: values.completed,
            labels: values.labels.map(label => label.id),
            dueDate: values.dueDate.toString(),
          }),
        ).then(() => {
          formik.resetForm()
        })
      }
    },
  })

  const handleOnClose = () => {
    if (!_.isEqual(formik.values, initialValues)) {
      dispatch(setConfirmOpen(true))
    } else {
      setModalOpen(false)
    }
  }
}

export default useTask
