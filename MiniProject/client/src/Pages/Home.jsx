import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '../Components/Layout'
import { useDispatch,useSelector } from 'react-redux'
import { setUser } from '../Redux/userSlice'

function Home() {
  const dispatch = useDispatch()
  let {updated} = useSelector((state) => state.user)
  const getData=async()=>{
    try {
      const {data} =await axios.post('/api/user/get-user-info-by-id',{},
      {
          headers :{
            Authorization : "Bearer"+ localStorage.getItem("token"),
          },
      })
      console.log('data'+data);
      dispatch(setUser(data.data))
    } catch (error) {

    }
  }
  useEffect(()=>{
    getData()
  },[setUser])
  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  )
}

export default Home