import { UserButton, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalAPI from './../../service/GlobalAPI';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const {user}=useUser();
  const [resumeList, setResumeList]=useState([]);

  useEffect(()=>{
    user&&GetResumesList()
  },[user])

/**
 * Used to get Users Resume List
 */

  const GetResumesList=()=>{
    GlobalAPI.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(resp=>{
      setResumeList(resp.data.data);
    });
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start creating AI resume for your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume/>
        {resumeList.length>0?resumeList.map((resume, index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>
        )):
        [1,2,3,4].map((item,index)=>(
          <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Dashboard