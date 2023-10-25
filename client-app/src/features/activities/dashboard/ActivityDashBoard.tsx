import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../detail/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities:Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id:string) =>void;
    cancelSelectActivity:() => void;
    editMode:boolean;
    openForm:(id:string) => void;
    closeForm:() =>void;
    createOrEdit:(activity: Activity) => void;
    deleteActivity:(id:string) => void;
    submitting:boolean;
}
export default function ActivityDashBoard({activities,selectedActivity,selectActivity,cancelSelectActivity,
                                            editMode,openForm,closeForm,createOrEdit,deleteActivity,submitting}:Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity} 
                deleteActivity={deleteActivity}
                submitting={submitting}
                ></ActivityList>
            </Grid.Column>
            <Grid.Column width={5}>

                {selectedActivity && !editMode &&
                <ActivityDetail activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
                />}

                {editMode &&
                <ActivityForm 
                closeForm = {closeForm} 
                activity={selectedActivity} 
                createOrEdit={createOrEdit}
                submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}