import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetail from "../detail/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


// eslint-disable-next-line react-refresh/only-export-components
export default observer (function ActivityDashBoard(){

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={5}>
                {selectedActivity && !editMode &&
                <ActivityDetail/>}
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})