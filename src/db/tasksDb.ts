import Dexie from 'dexie';
import type { Table } from 'dexie';

// Define the shape of a Task
export interface Task {
  /** Auto‑incremented primary key */
  id?: number;
  /** Title or description of the task */
  title: string;
  /** Day of the week the task is assigned to.
   *  Use a string like "Monday", "Tuesday", … or null for unassigned tasks */
  dayOfWeek: string | null;
  /** Whether the task is completed */
  completed: boolean;
}

// Define the Dexie database
export class TasksDB extends Dexie {
  /** The tasks table */
  public tasks!: Table<Task, number>;

  public constructor() {
    super('TasksDB');
    // Declare tables, schema and indexes
    this.version(1).stores({
      // id is primary key (auto‑increment), dayOfWeek is indexed for queries
      tasks: '++id, dayOfWeek, completed'
    });
  }
}

// Export a singleton instance
export const db = new TasksDB();