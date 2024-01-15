import { useGetAllUser } from '../../../../Hooks/useGetAllUser';
import { formatDistanceToNow } from 'date-fns';
import { IoSettingsOutline } from 'react-icons/io5';
import { useState } from 'react';
import AllUsersModal from './AllUsersModal';

const AllUsers = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const { users, refetch } = useGetAllUser();
  console.log(users);
  const [userInfo, setUserInfo] = useState({});

  return (
    <div className='dark:bg-stone-900 mt-10 p-8   overflow-x-auto'>
      <div className='overflow-x-auto '>
        <table className='table'>
          {/* head */}
          <thead className='dark:text-white'>
            <tr>
              <th>Index</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>User From</th>
              <th> Last Login</th>
              <th> User Role</th>
              <th>Trainer Status</th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className='avatar'>
                    <div className='mask mask-squircle w-12 h-12'>
                      <img
                        src={user.userPhoto}
                        alt='Avatar Tailwind CSS Component'
                      />
                    </div>
                  </div>
                </td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <p className='  text-xs'>
                    {new Date(user.userFrom).toLocaleString()}
                  </p>
                </td>
                <td>
                  <p className='  text-xs'>
                    {formatDistanceToNow(new Date(user.lastLogin))}
                  </p>
                </td>

                <td>
                  <p>{user.role}</p>
                </td>
                <td>{user.trainerStatus}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsOpen(true), setUserInfo(user);
                    }}
                    className='btn'>
                    {' '}
                    <IoSettingsOutline className='text-2xl' />{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AllUsersModal
        refetch={refetch}
        userInfo={userInfo}
        isOpen={isOpen}
        closeModal={closeModal}></AllUsersModal>
    </div>
  );
};

export default AllUsers;
