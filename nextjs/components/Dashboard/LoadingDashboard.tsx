import React from 'react'
import { Skeleton } from '@mui/material'
import Grid from '@mui/material'
// import styled from "styled-components"
import styled from 'styled-components';

function Loading(props: any){
  const LoadingBox = styled(Skeleton)`
    margin-bottom: 7px;
  `

  return (
    <div style={{padding: '7px'}}>
      <div style={{paddingBottom: '50px'}}>
      <LoadingBox />

      </div>
    </div>
  )
}

export default Loading