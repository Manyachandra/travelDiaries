import React, { useState } from 'react'
import './test.css'
import CustomSelect from "./CustomSelect/CustomSelect"
const languages = [
  {
    id: 0,
    label: 'Resturant',
    logo: 'https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg'
  },
  {
    id: 1,
    label: 'Food',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg'
  },
  {
    id: 2,
    label: 'Adventure',
    logo: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&w=1000&q=80'
  },
  {
    id: 3,
    label: 'Water-Sports',
    logo: 'https://global-uploads.webflow.com/5d98599ba491dd290226f10f/5f966a1b028165a041b80ab3_parasailing-in-star-island_aafac1664c3653c8ddbbbae1cb5099fd_800.jpeg'
  },
  {
    id: 4,
    label: 'Places',
    logo: 'https://static.india.com/wp-content/uploads/2017/03/Tourist-Places.jpg?impolicy=Medium_Resize&w=1200&h=800'
  }
]

function Test (props) {
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [myLanguages, setmySelectedLanguages] = useState([])
  return (

    <div className='tag'>
      
      <CustomSelect  value={selectedLanguages} onChange={(v) =>{
       setSelectedLanguages(v)
    if(v.length>=1){
     setmySelectedLanguages([...myLanguages,[languages[v[v.length - 1]].label]]);
     props.parentTestCallback(myLanguages);
    }

       }
       } options={languages}/>

    </div>
  )
}

export default Test