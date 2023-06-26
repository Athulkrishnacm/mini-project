import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {hideLoading,showLoading} from '../../Redux/alertsSlice'
import axios from 'axios'
import Layout from '../../Components/Layout'
import {Table} from 'react-bootstrap'
import './Userlist.css'
import toast from 'react-hot-toast'

function UserList() {

  const [users,setUser]=useState([])
  const [search,setSearch]=useState("")
  const dispatch=useDispatch()
  const getUsersData= async()=>{
    try {
      dispatch(showLoading())
      const response= await axios.get('/api/admin/get-all-users',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(response.data.success){
        setUser(response.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }
  const changeUserStatus = async(record,status)=>{
      try {
        const passId=record._id
        dispatch(showLoading())
        const response=await axios.post('/api/admin/change-user-status',{userIdd:passId},
        {
          headers:{
              Authorization:"Bearer " + localStorage.getItem('token'),
          }
        }) 
        dispatch(hideLoading())
        if(response.data.success){
          const updateUsers=users.map((users)=>{
            if(users._id===record._id){
              return{
                ...users,
                isActive:!users.isActive,
              }
            }
            return users
          })
          setUser(updateUsers)
          toast.success(response.data.message)
        }
      } catch (error) {
          dispatch(hideLoading())
          console.log(error);
      }
  }
  useEffect(()=>{
    getUsersData()
  },[])
  
  

const searchData = (data) => {
  return search === ""
    ? data
    : data.name.includes(search)
}

  return (
    <div>
        <Layout>
           
           <header className="px-5 py-4 border-b border-slate-100">
               <h2 className="font-semibold text-slate-800">Users List</h2>
           </header>
           <form className="border-b border-slate-200">
               <div className="relative">
                  <input
                       onChange={(e) => {
                           let searchValue = e.target.value.toLocaleLowerCase();
                           setSearch(searchValue)
                       }}
                       className="d-flex" type="search" placeholder="Search "
                        />
               </div>
           </form>
        
    <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.filter(searchData).map((user)=>(
          <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.createdAt}</td>
          <td>
            <div className='d-flex'>
              {user.isActive ? (
                <h1 className='userblock' onClick={()=>changeUserStatus(user)}>Block</h1>
              ):(
                <h1 className='userblock' onClick={()=>changeUserStatus(user)}>UnBlock</h1>
              )}
            </div>
          </td>
          </tr>
        ))}
        
      </tbody>
    </Table>
        </Layout>
    </div>
  )
}

export default UserList