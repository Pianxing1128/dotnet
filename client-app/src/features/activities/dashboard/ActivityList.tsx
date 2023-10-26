/* eslint-disable react-refresh/only-export-components */
import { Button, Item, Label, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";

export default observer (function ActivityList(){

    const {activityStore} = useStore();
    const {deleteActivity,activitiesByDate,loading} = activityStore;

    const [target, setTarget] = useState('');
    function handleDeleteActivity(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                               <div>{activity.description}</div>
                               <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' size='small' content='View' color='blue'></Button>
                                <Button loading={loading && target===activity.id} onClick={(e) => handleDeleteActivity(e,activity.id)} floated='right' size='small' content='Delete' color='red'></Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>    
    )
})