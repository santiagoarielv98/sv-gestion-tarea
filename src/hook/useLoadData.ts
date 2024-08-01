import React from "react"
import { selectUserState, setLoading, setUser } from "../redux/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setTasks } from "../redux/tasks/taskSlice"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { getTasks } from "../redux/tasks/taskThunk"

function useLoadData() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectUserState)
  React.useEffect(() => {
    dispatch(setLoading(true))
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email! }))
      } else {
        dispatch(setUser(null))
      }
      dispatch(setLoading(false))
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])
  React.useEffect(() => {
    if (user) {
      const taskUnsubscriber = getTasks(tasks => {
        dispatch(setTasks(tasks))
      })

      return () => {
        taskUnsubscriber()
      }
    }
  }, [user, dispatch])
}

export default useLoadData
