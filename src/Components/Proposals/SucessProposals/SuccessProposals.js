import React , {useEffect, useState} from 'react'
import { ipcsAddress,ipcsABI } from '../../../constant';
import { Button , Box, Center , Heading, VStack , HStack , Spinner } from '@chakra-ui/react';
import {ExternalLinkIcon} from "@chakra-ui/icons"
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import ExecutedProposalTile from '../ExecutedProposalTile/ExecutedProposalTile';



const SuccessProposals = () => {

  const [assetsArray , setassetsArray] = useState([]);
  const [loading , setloading] = useState("")
  
  const fetchSuccesfullProposals = async() => {
    setloading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)

    const tx = await ipcs.fetchSuccesfullProposals()
    const proposalsArray = Object.values(tx); 
    console.log(tx)
    setassetsArray(proposalsArray)
    setloading(false)
    console.log('Reading tx--> ')
    console.log(tx)
    console.log(assetsArray)
  }


  useEffect(() => {
    fetchSuccesfullProposals()
  },[])


  return (
    <div className='bg-[#0a1930] h-full' style={{minHeight:'100vh'}} >
        <Center justifyContent={'center'}>
        <VStack as='header' spacing='6' mt='8' wrap={'wrap'} justifyContent={'space-evenly'}>
        <Heading
              as='h1'
              fontWeight='700'
              fontSize='2rem'
              color={"white"}
              mt='10'
            >
              All Succesful Proposals
            </Heading>
       
         
            <Button
                    bg='#F5F4E4'
                    color={'#454545'}
                    className='btn-upload'
                    size='md'
                    _hover={{ bg: 'rgba(0, 0, 0, 0.53)' }}
                    _active={{ bg: '#298e46' }}
                    type='submit'
                    onClick={fetchSuccesfullProposals}
                    marginBottom="2rem" 
                    
                  >
                    Get Succesful Proposals
                  </Button>
          </VStack>
        </Center>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {loading ? 
                <Center h={'30vh'} justifyContent={'center'} >
                    <Spinner alignSelf={'center'} thickness='5px'speed='0.5s'emptyColor='gray.200'color='blue.500'size='xl' />
                </Center>
                 :
              <HStack wrap={'wrap'} justifyContent={'flex-start'}>
                {assetsArray.length !== 0 ? 
                <div className="grid sm:grid-cols-2 w-fit md:grid-cols-3 lg:grid-cols-4 mx-auto pb-10 gap-6">
                {assetsArray.map((items) => {
                  return (
                    <>
                      {items.tokenURI && (
                        <div style={{margin:'2rem'}} className="col-span-1 w-72 rounded-3xl border-2 border-sky-800 bg-[#17173d] pt-2.5 shadow-md hover:shadow-lg hover:shadow-black transition ease-in-out delay-150 shadow-black">
                          <ExecutedProposalTile state={true} tokenURI={items.tokenURI} proposalid={items.proposalId.toString()} yesvotes={items.yesvotes.toString()} novotes={items.novotes.toString()} />
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
                :
                <Center  h={'50vh'}>
                <div className='message'>No SuccessProposals... Pretty Strange <Link to='/uploadassets'><ExternalLinkIcon/></Link> </div>
                </Center>
               
            }
              </HStack>
}

        </HStack>

        
        
    


    </div>
  )
}

export default SuccessProposals