import { Dialog, Transition } from '@headlessui/react';
import { deleteAnUser, makeAdmin, makeTrainer } from '../../../../API/userApi';
import { Fragment } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../../Hooks/useAuth';
const AllUsersModal = ({ isOpen, refetch, closeModal, userInfo }) => {
  const {user:loginUser}=useAuth()
  const handleDeleteUser = (user) => {
    console.log(loginUser.email,'login user');
      if(loginUser.email === user.email){
        closeModal()
      return  Swal.fire({
          title: 'Deleted!',
          text: 'You can not delete your self',
          icon: 'error',
        });
      }
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteAnUser(user.email);
        console.log(data);
        if (data.deletedCount === 1) {
          Swal.fire({
            title: 'Deleted!',
            text: 'You deleted the user.',
            icon: 'success',
          });

          refetch();
          closeModal();
        }
      }
    });
  };
  const handleMakeAdmin = (user) => {
    if(user.role === 'admin'){
      closeModal()
      return  Swal.fire({
          title: 'error!',
          text: `${user?.userName}is already an admin`,
          icon: 'error',
        });
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes,make ${user?.userName} admin`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await makeAdmin(user?.email);
        console.log(data);
        if (data.modifiedCount === 1) {
          Swal.fire({
            title: 'Success!',
            text: `${user.userName} is admin now.`,
            icon: 'success',
          });

          refetch();
          closeModal();
        }
      }
    });
  };
  const handleMakeTrainer = (user) => {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes,make ${user?.userName} trainer`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await makeTrainer(user?.email);
        console.log(data);
        if (data.modifiedCount === 1) {
          Swal.fire({
            title: 'Success!',
            text: `${user.userName} is trainer now.`,
            icon: 'success',
          });

          refetch();
          closeModal();
        }
      }
    });
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium text-center border-b-2 pb-2 border-black leading-6 text-gray-900'>
                    Take action for {userInfo?.userName}
                  </Dialog.Title>

                  <div className='mt-2'>
                    {userInfo && (
                      <div className='flex  pt-5 gap-10 w-fit mx-auto'>
                        <button onClick={()=>handleMakeAdmin(userInfo)} className='btn hover:bg-black bg-red-600 text-white'>
                          Make admin
                        </button>
                        <button
                          onClick={() => handleDeleteUser(userInfo)}
                          className='btn hover:bg-black bg-red-600 text-white'>
                          Delete user
                        </button>
                     
                      </div>
                    )}
                    { userInfo.trainerStatus === 'pending' && (
                      <div className='flex  pt-5 gap-10 w-fit mx-auto'>
                        <button onClick={()=>handleMakeTrainer(userInfo)} className='btn hover:bg-black bg-red-600 text-white'>
                          Make trainer
                        </button>
                       
                     
                      </div>
                    )}

                  </div>
                  <div
                    onClick={() => closeModal()}
                    className='w-fit mx-auto mt-10'>
                    {' '}
                    <p className='btn hover:bg-slate-800  bg-slate-600 text-white'>
                      back
                    </p>
                  </div>

                  <hr className='mt-8 ' />
                  {/* Card data form */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AllUsersModal;
