import { useEffect, useState } from "react";
import axiosSecure from "../../../../API/axiosSecure";
import { useNavigate } from "react-router-dom";
import TitleText from "../../../../Components/Shared/SmallComponents/Title/Title";

const RecommendedClasses = () => {
    const navigate=useNavigate()
    const [recommendedClasses, setRecommendedClasses] = useState([])

    useEffect(()=>{
        axiosSecure.get('/recommendedClasses').then(data=>setRecommendedClasses(data.data))
    },[])


  return (
    <div>
       <TitleText heading={' Some free recommended classes '}></TitleText>
      <div className='grid p-10 grid-cols-1 md:grid-cols-2 py-20 lg:grid-cols-3 gap-10'>
        {recommendedClasses?.map((singleClass, index) => (
          <div
            key={index}
            className='card overflow-hidden  dark:bg-slate-700 bg-slate-200 shadow-xl'>
            <div className='h-[400px] '>
              <img
                className='w-full h-full object-cover '
                src={singleClass?.classImage}
                alt='Shoes'
              />
            </div>
            <div className=' space-y-1 mt-2 p-5 '>
              <p className='  font-medium'>
                Trainer : {singleClass?.trainerName}
              </p>
              <p className=' font-medium'>Topic : {singleClass?.classTopic}</p>
              <p className=' font-medium'>
                Days :
                {singleClass?.classDays?.map(
                  (data, index) =>
                    data +
                    (index < singleClass?.classDays?.length - 1 ? ', ' : '.'),
                )}
              </p>

              <p className='font-bold text-lg'>
                Title : {singleClass?.classTitle?.slice(0, 50)}
              </p>
              <div className='card-actions justify-end'>
                <div className='badge badge-outline'>
                  {singleClass.classPrice}
                </div>
              </div>
              <div className='w-fit mx-auto'>
                <button
                  onClick={() => navigate(`/class/${singleClass?._id}`)}
                  className='group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500'>
                  <span className='absolute -start-full transition-all group-hover:start-4'>
                    <svg
                      className='h-5 w-5 rtl:rotate-180'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </span>

                  <span className='text-sm font-medium transition-all group-hover:ms-4'>
                    Details
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedClasses;