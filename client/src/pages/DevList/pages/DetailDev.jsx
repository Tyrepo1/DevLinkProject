import React from 'react'
import { useParams } from 'react-router-dom'
import TopNav from '../../../components/TopNav'
import Footer from '../../../components/Footer'
import { Button } from '@mui/material'

function DetailDev() {
    const params = useParams()
    const id = params.id
    return (
        <div>
            <TopNav/>
                    Test {id}
            <Footer/>
        </div>
    )
}

export default DetailDev