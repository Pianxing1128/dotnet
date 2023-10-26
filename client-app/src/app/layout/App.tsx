/* eslint-disable react-refresh/only-export-components */
import {  useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashBoard';

import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore();

  useEffect(() => {
   activityStore.loadingActivities()
  }, [activityStore])
  
 
  //这里使用了展开运算符(`...`)将筛选后的活动数组和新的`activity`对象合并，并通过`setActivities`函数更新`activities`的状态。
 

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <ActivityDashBoard />
      </Container>
      
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);
