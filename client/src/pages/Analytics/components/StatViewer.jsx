import React from 'react'
import { Card, Typography, CardContent } from '@mui/material'

function StatViewer({name, value, unit, icon}) {
  return (
    <div>
        <Card sx={{ minWidth: 275 }}>
      <CardContent className='flex'>
          <div className=' my-auto mr-7'>
            {icon}
          </div>
          <div>
            <Typography variant="h5" color={"primary"}>
              {name}
            </Typography>
            <Typography color="text.secondary">
              {value} {unit}
            </Typography>
          </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default StatViewer