import {TaskId, TasksSettings} from "@qommand/common/src/settings/tasks.settings.types";
import {useSettings} from "../../hooks/useSettings";

export type EditTaskProps = { taskId: TaskId }

export const EditTask = ({taskId}: EditTaskProps) => {
    const {isLoading, settings, updateSettings} = useSettings<TasksSettings>('tasks');

    if (isLoading) return <span>loading...</span>

    const {tasks} = settings;
    const task = tasks[taskId];

    if (!task) return <span>Unknown task ({taskId})...</span>

    return <div>
        {task.name}
    </div>
}