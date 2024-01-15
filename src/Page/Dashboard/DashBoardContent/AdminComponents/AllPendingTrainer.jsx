

import { useGetPendingTrainer } from "../../../../Hooks/useGetPendingTrainer";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import AllPendingTrainerModal from "./AllPendingTrainerModal";

const AllTrainer = () => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal=()=>{
      setIsOpen(false)
  }
  const {trainers,refetch}=useGetPendingTrainer()
  const[trainerInfo,setTrainerInfo]=useState({})
  return (
    <div className=" mt-10 p-8 dark:bg-stone-900">
    <div className="  custom-scrollbar-container ">
<table className="table">
  {/* head */}
  <thead className="dark:text-white">
    <tr>
      <th>
          Index
      </th>
      <th>
        Image
      </th>
      <th>Name</th>
      <th>Email</th>
      <th>Trainer From</th>
      <th> Skills</th>
      <th> Available Day In week</th>
      <th>Trainer Status</th>
      <th>Trainer Level</th>
      <th> Action</th>

    </tr>
  </thead>
  <tbody>
    {
     trainers?.map((trainer,index)=><tr key={index}>
     <th>
      {index+1} 
     </th>
     <td>
       
         <div className="avatar">
           <div className="mask mask-squircle w-12 h-12">
             <img src={trainer.profileImage} alt="Avatar Tailwind CSS Component" />
           </div>
         </div>
         
       
     </td>
     <td>
      {trainer.name}
     </td>
     <td>{trainer.email}</td>
     <td>
       <p className="  text-xs">{new Date(trainer.trainerFrom).toLocaleString()}</p>
     </td>
     <td>
     {
      trainer.skill?.map((skill,index)=><span key={index}>{skill},</span>)
     }
     </td>
     
     <td>
      <p>
        {
          trainer.availableTimeWeek?.map((day,index)=><span key={index}>{day},</span>)
        }
      </p>
     </td>
     <td>
      {
          trainer.trainerStatus
      }
     </td>
     <td>
      {
        trainer.trainerPackage
      }
     </td>
     <td>
      <button onClick={()=>{setIsOpen(true),setTrainerInfo(trainer)}
          } className="btn"> <IoSettingsOutline  className="text-2xl"/> </button>
     </td>
   </tr>
  )
    }
    
  </tbody>
  
  
</table>
</div>
 
<AllPendingTrainerModal refetch={refetch} trainerInfo={trainerInfo}  isOpen={isOpen} closeModal={closeModal}></AllPendingTrainerModal>
  </div>
  );
};

export default AllTrainer;