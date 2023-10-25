import {  useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashBoard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submiting,setSubmiting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      const activities: Activity[] = [];
      response.forEach(activity =>{
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })

      setActivities(activities)
      setLoading(false)
      })
  }, [])
  
  function handleSelectedActivity(id:string ){
    setSelectedActivity(activities.find(x => x.id ===id))
  }

  function handleCancelActivity(){
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?:string){
    id ? handleSelectedActivity(id):handleCancelActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }
  //这里使用了展开运算符(`...`)将筛选后的活动数组和新的`activity`对象合并，并通过`setActivities`函数更新`activities`的状态。
  function handleCreateOrEditActivity(activity: Activity){
    setSubmiting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmiting(false);
      })
    }else {
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false) ;
        setSubmiting(false);
        })
    }
  }

  function handleDeleteActivity(id:string) {
    setSubmiting(true)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmiting(false)
    })
    
  }

  if(loading) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar openForm={handleFormOpen}/>

      <Container style={{marginTop:'7em'}}>
        <ActivityDashBoard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectedActivity}
        cancelSelectActivity={handleCancelActivity}
        editMode = {editMode}
        openForm ={handleFormOpen}
        closeForm ={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submiting}
       />
      </Container>
      
    </>
  )
}

export default App
