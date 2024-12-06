import React from 'react'
import ReserveSchedulerComponent from './ReserveSchedulerComponent'


function ReserveScheduler({property}) {

  let dates = []
  for(let i=0; i<30; i++){
      let newDate=new Date()
      newDate.setDate(newDate.getDate() + i);
      dates.push(newDate)
  }

  return (
    <div className='scheduler'>
        <div className='schedulerHeader'>
            <div className='schedulerEmpty'>

            </div>
            <div className='schedulerTime'>
                10:00
            </div>
            <div className='schedulerTime'>
                13:00
            </div>
            <div className='schedulerTime'>
                15:00
            </div>
            <div className='schedulerTime'>
                17:00
            </div>
        </div>
        <div className='schedulerBody'>
        { dates.length > 0 ? (
            dates.map((d) => (

                <div className='schedulerRow'> 
                    <div className='schedulerDate'> 
                        {d.toDateString()} 
                    </div>
                    <div className='schedulerClickable'> 
                        <ReserveSchedulerComponent key={d.getDay() + d.getDate() + 1} property={property} d={d.toDateString()} t={10}/>
                    </div>
                    <div className='schedulerClickable'> 
                        <ReserveSchedulerComponent key={d.getDay() + d.getDate() + 2} property={property} d={d.toDateString()} t={13}/>
                    </div>
                    <div className='schedulerClickable'> 
                        <ReserveSchedulerComponent key={d.getDay() + d.getDate() + 3} property={property} d={d.toDateString()} t={15}/>
                    </div>
                    <div className='schedulerClickable'> 
                        <ReserveSchedulerComponent key={d.getDay() + d.getDate() + 4} property={property} d={d.toDateString()} t={17}/>
                    </div>
                    
                </div>
            ))
          ): (<div>NEMA</div>)}
        </div>
       

    </div>
  )
}

export default ReserveScheduler