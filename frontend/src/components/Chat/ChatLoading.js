import React from 'react'
import {Stack, Skeleton} from '@mui/material'
const ChatLoading = () => {
  return (
    <Stack spacing={1} sx={{marginLeft: "8px"}}>
    <Skeleton animation="wave" variant="rectangular" height={70} sx={{borderRadius: "5px", width: "97.5%"}}/>
    <Skeleton animation="wave" variant="rectangular" height={70} sx={{borderRadius: "5px", width: "97.5%"}}/>
    <Skeleton animation="wave" variant="rectangular" height={70} sx={{borderRadius: "5px", width: "97.5%"}}/>
    <Skeleton animation="wave" variant="rectangular" height={70} sx={{borderRadius: "5px", width: "97.5%"}}/>
    <Skeleton animation="wave" variant="rectangular" height={70} sx={{borderRadius: "5px", width: "97.5%"}}/>
    <Skeleton animation="wave" variant="rectangular" height={70} sx={{borderRadius: "5px", width: "97.5%"}}/>

    </Stack>
  )
}

export default ChatLoading