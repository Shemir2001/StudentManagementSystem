import React, { useState, useEffect } from 'react';
import { app } from '../../firebase/Firebase';
import { firestore } from '../../firebase/Firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Button, Table, Input, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
const Lists = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchbox, setSearchbox] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalState, setModalState] = useState({
    Name: '',
    RollNo: '',
    Email: ''
   });
  // const requestPermision = async () => {
  //   try {
  //    const permission= await Notification.requestPermission();
  //    if(permission ==='granted'){
  //      //generate token
  //    }
  //    else if(permission === 'denied'){
  //      message.error('Permission denied');
  //    }
  //   } catch (err) {
  //     console.log(err);
  //    }
  
 const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const handleDelete = async (id) => {
    try {
      const deleteRef = doc(firestore, 'Users', id);
      await deleteDoc(deleteRef);
      message.success('User deleted successfully');
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { key: '1', title: 'Name', dataIndex: 'Name' },
    { key: '2', title: 'RollNo', dataIndex: 'RollNo' },
    { key: '3', title: 'Email', dataIndex: 'Email' },
    { key: '4', title: 'Id', dataIndex: 'id' },
   {key:'5',
    title: 'Status',
    render: (record)=>{
      return(
        <span className={`${record.Suspend === true ? 'bg-red-100 text-red-900 border border-red-500' : 'bg-green-100 text-green-900 border border-green-500'} font-semibold px-3 py-1 rounded-full shadow-md transition-all duration-300 ease-in-out hover:shadow-lg`}>
          {record.Suspend === true ? 'Suspended' : 'Active'}
        </span>
      )
      
    }
   },
   {
    key: '6',
    title: 'Action',
    render: (record) => (
      <div className="flex space-x-2">
        <Link to={`/edituser/${record.id}`}>
          <Button type="primary">Update</Button>
        </Link>
        <Popconfirm
          title="Are you sure you want to delete?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        
        </Popconfirm>
        </div>
   )},
    {
      key:'7', 
      title:'Action', 
      render:(record)=>{
        return(
          <Button onClick={()=>handleToggleSuspend(record.id, record.Suspend)}>
            {record.Suspend ? 'Activate' : 'Suspend'}
          </Button>
        )
      }
    }
  
   
  ];
const handleChanges = (e) => {
    setModalState({ ...modalState, [e.target.name]: e.target.value });
  };
const getData = async () => {
    try {
      const refUser = collection(firestore, 'Users');
      const dataGet= await getDocs(refUser);
    
      const actualData = dataGet.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(actualData);
      setFilteredData(actualData);
    } catch (err) {
      console.log(err);
    }
  };
useEffect(() => {
    getData();
  }, []);
const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
const hasSelected = selectedRowKeys.length > 0;
const handleCreateUser = async () => {
    try {
      const refUser = collection(firestore, 'Users');
      await addDoc(refUser, {
        Name: modalState.Name,
        RollNo: modalState.RollNo,
        Email: modalState.Email
      });
      setModalState({ Name: '', RollNo: '', Email: '' });
      message.success('User Created')
      setTimeout(() => {
        setModal(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
    getData();
  };
const handleToggleSuspend = async (id, isSuspended) => {
  try{
    const ref = doc(firestore, 'Users', id);
    await updateDoc(ref, {
      Suspend: !isSuspended,  
    });
    message.success('Status updated successfully');
    getData();  
  }
    catch{
      message.error('Something went wrong');
    }
  };
const handleSearch = (e) => {
    setSearchbox(e.target.value);
    const filterData = data.filter((item) =>
      item.Name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filterData);

    if (e.target.value === '') {
      setFilteredData(data);
    }
  };
const handlePaginationChange = (type) => {
    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / pagination.pageSize);
    
    if (type === 'next' && pagination.current < totalPages) {
      setPagination({ ...pagination, current: pagination.current + 1 });
    } else if (type === 'prev' && pagination.current > 1) {
      setPagination({ ...pagination, current: pagination.current - 1 });
    }
  };
const displayedData = filteredData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );
return (
    <>
        <div className="bg-gray-900 p-6 shadow-md rounded-lg mt-11 ml-7">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white mr-2"
            >
              Reload
            </Button>
            {hasSelected ? (
              <span className="text-gray-900">{`Selected ${selectedRowKeys.length} items`}</span>
            ) : null}
          </div>

          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search by Name"
              value={searchbox}
              onChange={handleSearch}
              className="w-64 rounded-lg border-gray-900"
            />
          </div>
          <Button
            type="primary"
            className="bg-[#001529] hover:bg-green-700 text-white"
            onClick={() => setModal(true)}
          >
            Create User
          </Button>
        </div>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={displayedData}
          pagination={false}
        />
    
        <div className="flex flex-col items-center mt-4">
          <span className="text-sm text-white">
            Showing <span className="font-semibold text-white">{(pagination.current - 1) * pagination.pageSize + 1}</span> to <span className="font-semibold text-white">{Math.min(pagination.current * pagination.pageSize, filteredData.length)}</span> of <span className="font-semibold text-white">{filteredData.length}</span> Entries
          </span>
          <div className="inline-flex mt-2">
            <button 
              onClick={() => handlePaginationChange('prev')}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900"
            >
              Prev
            </button>
            <button 
              onClick={() => handlePaginationChange('next')}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-r hover:bg-gray-900"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      
  {modal && (
        <div className="fixed top-5 right-5 bg-white rounded-lg shadow-lg w-full max-w-sm p-6 space-y-6 z-50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add User</h2>
            <button onClick={() => setModal(false)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                onChange={handleChanges}
                type="text"
                id="name"
                name="Name"
                value={modalState.Name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="rollno" className="block text-sm font-medium text-gray-700">Roll No</label>
              <input
                onChange={handleChanges}
                type="text"
                id="rollno"
                name="RollNo"
                value={modalState.RollNo}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter roll no"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                onChange={handleChanges}
                type="email"
                id="email"
                name="Email"
                value={modalState.Email}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCreateUser}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add User
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Lists;
