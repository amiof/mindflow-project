import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField
} from "@mui/material"
import { Calendar, Plus, Trash } from "lucide-react"
import { db } from "../../db/tasksDb"
import type { Task } from "../../db/tasksDb.ts"

// Helper to fetch all tasks (optionally filtered by day)
const fetchTasks = async (day?: string | null) => {
  if (day === undefined) {
    return await db.tasks.toArray()
  }
  if (day === null) {
    return await db.tasks.where("dayOfWeek").equals(null).toArray()
  }
  return await db.tasks.where("dayOfWeek").equals(day).toArray()
}

export const TaskManager: React.FC = () => {
  const [title, setTitle] = useState("")
  const [day, setDay] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [filterDay, setFilterDay] = useState<string | null>("All")
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [assignDay, setAssignDay] = useState<string>("")
  
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]
  
  // Load tasks whenever filterDay changes
  useEffect(() => {
    const load = async () => {
      let fetched: Task[]
      if (filterDay === "All") {
        fetched = await fetchTasks()
      }
      else if (filterDay === "Unassigned") {
        fetched = await fetchTasks(null)
      }
      else {
        fetched = await fetchTasks(filterDay)
      }
      setTasks(fetched)
    }
    load()
  }, [filterDay])
  
  const addTask = async () => {
    if (!title.trim()) return
    await db.tasks.add({ title: title.trim(), dayOfWeek: day, completed: false })
    setTitle("")
    setDay(null)
    // Refresh list
    const refreshed = await fetchTasks(
      filterDay === "All"
        ? undefined
        : filterDay === "Unassigned"
          ? null
          : filterDay
    )
    setTasks(refreshed)
  }
  
  // const toggleComplete = async (task: Task) => {
  //   await db.tasks.update(task.id!, { completed: !task.completed })
  //   const refreshed = await fetchTasks(
  //     filterDay === "All"
  //       ? undefined
  //       : filterDay === "Unassigned"
  //         ? null
  //         : filterDay
  //   )
  //   setTasks(refreshed)
  // }
  //
  const deleteTask = async (id?: number) => {
    if (id === undefined) return
    await db.tasks.delete(id)
    const refreshed = await fetchTasks(
      filterDay === "All"
        ? undefined
        : filterDay === "Unassigned"
          ? null
          : filterDay
    )
    setTasks(refreshed)
  }
  
  const openAssignModal = (task: Task) => {
    setSelectedTask(task)
    setAssignDay(task.dayOfWeek ?? "")
    setAssignModalOpen(true)
  }
  
  const closeAssignModal = () => {
    setAssignModalOpen(false)
    setSelectedTask(null)
    setAssignDay("")
  }
  
  const confirmAssign = async () => {
    if (selectedTask) {
      await db.tasks.update(selectedTask.id!, { dayOfWeek: assignDay || null })
      const refreshed = await fetchTasks(
        filterDay === "All"
          ? undefined
          : filterDay === "Unassigned"
            ? null
            : filterDay
      )
      setTasks(refreshed)
    }
    closeAssignModal()
  }
  
  return (
    <Box sx={{ px: 2 }}>
      {/*<Typography variant="h5" gutterBottom>*/}
      {/*  Task Manager*/}
      {/*</Typography>*/}
      
      {/* New task form */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        
        <TextField
          size={"small"}
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          sx={{
            borderColor: "white",
            color: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white"
              },
              "&:hover fieldset": {
                borderColor: "white"
              },
              "&.Mui-focused fieldset": {
                borderColor: "white"
              },
              "& input": {
                color: "white"
              }
            },
            "& .MuiInputLabel-root": {
              color: "white"
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white"
            }
          }}
          placeholder="Whats on your mind?"
          InputProps={{
            style: {
              color: "white"
            }
          }}
        />
        {/*<TextField*/}
        {/*  label="Task title"*/}
        {/*  value={title}*/}
        {/*  onChange={e => setTitle(e.target.value)}*/}
        {/*  size={"small"}*/}
        {/*  fullWidth*/}
        {/*  sx={{*/}
        {/*    color: 'white',*/}
        {/*    '& .MuiOutlinedInput-root': {*/}
        {/*      '& fieldset': {*/}
        {/*        borderColor: 'white',*/}
        {/*      },*/}
        {/*      '&:hover fieldset': {*/}
        {/*        borderColor: 'white',*/}
        {/*      },*/}
        {/*      '&.Mui-focused fieldset': {*/}
        {/*        borderColor: 'white',*/}
        {/*      },*/}
        {/*    },*/}
        {/*    '& .MuiInputBase-input': {*/}
        {/*      color: 'white',*/}
        {/*      '&:hover': {*/}
        {/*        color: 'white',*/}
        {/*      },*/}
        {/*    },*/}
        {/*    '& .MuiInputLabel-root': {*/}
        {/*      color: 'white',*/}
        {/*    },*/}
        {/*    '& .MuiInputLabel-root.Mui-focused': {*/}
        {/*      color: 'white',*/}
        {/*    },*/}
        {/*  }}*/}
        {/*/>*/}
        {/* Day selector removed */}
        <IconButton onClick={addTask}
                    sx={{ background: "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 75%, rgba(111, 237, 83, 1) 100%)" }}>
          <Plus color={"white"} />
        </IconButton>
      </Box>
      
      {/* Filter selector */}
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel id="filter-label" sx={{ color: "white" }}>Show</InputLabel>
        <Select
          labelId="filter-label"
          value={filterDay}
          label="Show"
          sx={{
            color: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white !important"
              },
              "&:hover fieldset": {
                borderColor: "white !important"
              },
              "&.Mui-focused fieldset": {
                borderColor: "white !important"
              }
            },
            "& .MuiInputBase-input": {
              color: "white"
            },
            "& .MuiSvgIcon-root": {
              color: "white"
            }
          }}
          onChange={e => setFilterDay(e.target.value as string)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Unassigned">Unassigned</MenuItem>
          {daysOfWeek.map(d => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      
      {/* Task list */}
      <List sx={{ width: "100%", height: "70vh", overflow: "auto" }}>
        {tasks.map(task => (
          <ListItem
            // sx={{borderRdiuse:"5px", mt: "3px", backgroundColor: "#181F31" }}
            className={"rounded-lg bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 mb-2"}
            key={task.id}
            secondaryAction={
              <>
                <IconButton color="primary" onClick={() => openAssignModal(task)}>
                  <Calendar size={25} />
                </IconButton>
                <IconButton color="error" onClick={() => deleteTask(task.id)}>
                  <Trash size={23} />
                </IconButton>
              </>
            }
          >
            {/*<ListItemIcon>*/}
            {/*  <Checkbox*/}
            {/*    edge="start"*/}
            {/*    checked={task.completed}*/}
            {/*    onChange={() => toggleComplete(task)}*/}
            {/*  />*/}
            {/*</ListItemIcon>*/}
            <ListItemText
              primary={task.title}
              secondary={task.dayOfWeek ?? "Unassigned"}
              sx={{
                "& .MuiListItemText-primary": { color: "white" },
                "& .MuiListItemText-secondary": { color: "white" }
              }}
            />
          </ListItem>
        
        ))}
        
        <Box sx={{ background:"bg-slate-800", width: "100%", height: "80px" }}>
        
        </Box>
      </List>
      
      {/* Assign Modal */}
      <Dialog open={assignModalOpen} onClose={closeAssignModal}>
        <DialogTitle>Assign Task to Day</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="assign-day-label" sx={{ color: "white" }}>Day</InputLabel>
            <Select
              labelId="assign-day-label"
              value={assignDay}
              label="Day"
              sx={{
                color: "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white !important"
                  },
                  "&:hover fieldset": {
                    borderColor: "white !important"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white !important"
                  }
                },
                "& .MuiInputBase-input": {
                  color: "white"
                },
                "& .MuiSvgIcon-root": {
                  color: "white"
                }
              }}
              onChange={e => setAssignDay(e.target.value as string)}
            >
              <MenuItem value="">
                <em>Unassigned</em>
              </MenuItem>
              {daysOfWeek.map(d => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAssignModal}>Cancel</Button>
          <Button onClick={confirmAssign} variant="contained">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TaskManager