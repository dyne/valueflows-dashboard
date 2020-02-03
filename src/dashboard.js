import React, {useState} from 'react';
 import styled from 'styled-components'
import {Box, Flex, Button, Text, Image, Heading} from 'rebass'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { Label, Input, Textarea } from '@rebass/forms'
import { EventsList } from './events-list';
import gql from "graphql-tag";
import {  useMutation } from '@apollo/react-hooks';


const CREATE_ECONOMIC_EVENT = gql`
  mutation createEconomicEvent(
    $action: String!,
    $resourceQuantityHasUnit: String,
    $resourceQuantityHasNumericalValue: Float,
    $resourceInventoriedAs: String,
    $toResourceInventoriedAs: String,
    $currentLocation: String
    $resourceConformsTo: String
    $resourceDescription: String
  ) {
    createEconomicEvent(event: {
      action: $action,
      resourceQuantityHasUnit: $resourceQuantityHasUnit,
      resourceQuantityHasNumericalValue: $resourceQuantityHasNumericalValue,
      resourceInventoriedAs: $resourceInventoriedAs,
      toResourceInventoriedAs: $toResourceInventoriedAs,
      currentLocation: $currentLocation,
      resourceConformsTo: $resourceConformsTo
      resourceDescription: $resourceDescription
    }) {
      economicEventId
    }
  }
`;
const Title = styled(Text)`
  font-size: 16px;
  letter-spacing: 1px;
  color: rgb(101, 119, 134);
`

const WrapResourceQuantityUnit = styled(Select)`
  flex: 1;
`

const Dashboard = ({data}) => {
  const [action, setAction] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState('')
  const [lgn, setLong] = useState('')
  const [lat, setLat] = useState('')
  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [resource, setResource] = useState('')
  const [toResource, setToResource] = useState('')
  const [resourceDescription, setResourceDescription] = useState('')
  const options = [
    { value: 'transfer', label: 'Transfer' },
    { value: 'consume', label: 'Consume' },
    { value: 'produce', label: 'Produce' },
    { value: 'use', label: 'Use' }
  ]
  const units = [{value: 'each', label: 'Each'},
                 {value: 'kilo', label: 'Kilo'}]
  
  const [createEconomicEvent, {economicData}] = useMutation(CREATE_ECONOMIC_EVENT)
    return (
      <Box sx={{width: "680px", margin: "0 auto", marginTop: '20px'}}>
        <Box
          sx={{
            px: 4,
            py: 6,
            backgroundImage: 'url(https://picsum.photos/id/106/800/400)',
            backgroundSize: 'cover',
            borderRadius: 8,
            color: 'white',
            backgroundPosition: "center center",
            bg: 'gray',
          }}>
        </Box>
        <Flex>
        <Image
            src='https://picsum.photos/id/1025/130/130'
            variant='avatar'
            sx={{
              width: "130px",
              height: "130px",
              borderRadius: "100%",
              marginTop: "-50px",
              marginLeft: "30px",
              border: "4px solid #fff"}}
          />
          <Box>
            <Text mt={2} ml={3}
              sx={{fontSize: "32px",
                fontWeight: "700"}}
            >Jo Freeman</Text>
            <Box 
            sx={{width: "300px"}} mt={2} ml={3}
            as="form"
            onSubmit={e => {
            e.preventDefault();
            let currentLocation = null
            if (lgn !== '' && lat !== '') {
              currentLocation = lgn + ',' + lat
            } 
            console.log(tags)
            const variables = {
              action: action.value,
              resourceQuantityHasUnit: unit,
              resourceQuantityHasNumericalValue: parseFloat(quantity),
              resourceInventoriedAs: resource.value,
              toResourceInventoriedAs: toResource.value,
              currentLocation: currentLocation,
              resourceDescription: resourceDescription,
              resourceConformsTo: tags.map(tag => tag.value).join(',')
            }
            createEconomicEvent({ variables: variables });
            setAction('')
            setQuantity(0)
            setUnit('')
            setLong('')
            setLat('')
            setTags([])
            setResource('')
            setToResource('')
            setResourceDescription('')
            return null
          }}
        >

          {action === '' ? 
          <Select 
            placeholder="select an action..." 
            options={options}
            value={action}
            onChange={(v) => setAction(v)} />

          : 
          <>
          <Select 
          placeholder="select an action..." 
          options={options}
          value={action}
          onChange={(v) => setAction(v)} />

          {action.value === 'transfer' ?
          <Box mt={2}>
            <Box mb={2}>
              <Label sx={{fontSize: "13px"}}>Original resource name</Label>
              <SelectResource
                resource={resource}
                setResource={setResource}
                options={data.allEconomicResources.map(r => ({value: r.name, label: r.name}))}
              />
            </Box>
            <Label sx={{fontSize: "13px"}}>New resource name</Label>
            <SelectResource
              resource={toResource}
              setResource={setToResource}
              options={data.allEconomicResources.map(r => ({value: r.name, label: r.name}))}
            />
          </Box> : 
          <Box mt={2} mb={2}>
          <SelectResource
            resource={resource}
            setResource={setResource}
            options={data.allEconomicResources.map(r => ({value: r.name, label: r.name}))}
          />
          </Box>
          }
        
          <Flex mt={2}>
          <Input
              sx={{width: '140px', borderRadius: '4px', border: '1px solid hsl(0,0%,80%)'}}
              mr={2}
              onChange={(e) => setQuantity(e.target.value)}
              id='quantity'
              name='quantity'
              type='number'
              placeholder='00.00'
            />
            <WrapResourceQuantityUnit
              placeholder="Select a unit" 
              options={units}
              onChange={(val) => setUnit(val.value)}  
            />
          </Flex>
          {action.value === "transfer" || action.value === "produce" ?
          <>
            <Flex mt={2}>
              <Box mr={2}>
                <Label sx={{fontSize: '13px'}} htmlFor='longitude'>Longitude</Label>
                <Input
                  sx={{borderRadius: '4px', border: '1px solid hsl(0,0%,80%)'}}
                  id='longitude'
                  name='longitude'
                  type='text'
                  placeholder='52.3728103'
                  onChange={e => setLong(e.target.value)}
                />
              </Box>
              <Box>
                <Label sx={{fontSize: '13px'}} htmlFor='latitude'>Latitude</Label>
                <Input
                  sx={{borderRadius: '4px', border: '1px solid hsl(0,0%,80%)'}}
                  id='latitude'
                  name='latitude'
                  type='text'
                  placeholder='4.898097,17'
                  onChange={e => setLat(e.target.value)}
                />
              </Box>
            </Flex>
            <Box mt={2} p={2} sx={{borderRadius: "6px", bg: "#dadada"}}>
            <Box>
              <Label sx={{fontSize: '13px'}} htmlFor='comment'>Add a resource description</Label>
              <Textarea
                sx={{borderRadius: '4px', bg: "#fff", border: '1px solid hsl(0,0%,80%)'}}
                id='comment'
                name='comment'
                onChange={e => setResourceDescription(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <Label sx={{fontSize: '13px'}} htmlFor='tags'>Add some tags</Label>
              <SelectTag tags={tags} inputValue={inputValue} setTags={setTags} setInputValue={setInputValue}/></Box>
          </Box>
          </> : null
          }
          
          <Button sx={{
            width: "100%",
            background: "#267e63",
            height: "40px"
          }} mt={3}>Submit</Button>
          </>
          }
        </Box>
          </Box>
          </Flex>
        
        <Title mt={4} pb={2} mb={2} sx={{fontWeight: 800, borderBottom: "1px solid #dadada"}}>Recent economic activities</Title>
        <EventsList />
      </Box>
    );
  }





const SelectResource = ({resource, setResource, options}) => {
    return (
      <Box>
      <CreatableSelect
        isClearable
        placeholder="Select or create a new resource..."
        onChange={(newValue, actionMeta) => {
          setResource(newValue)
        }}
        onInputChange={(inputValue, actionMeta) => {}}
        options={options}
        value={resource}
      />
      </Box>
    );
  }


  const components = {
    DropdownIndicator: null,
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const SelectTag = ({tags, inputValue, setInputValue, setTags}) => {
    return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(value, actionMeta) => {setTags(value)}}
        onInputChange={(inputValue) => {
          setInputValue(inputValue)
        }}
        onKeyDown={(event) => {
          if (!inputValue) return;
          let value
          if (tags !== null) {
            value = tags
          } else {value = []}
          switch (event.key) {
            case 'Enter':
            case 'Tab':
            
              setInputValue('')
              setTags([...value, createOption(inputValue)])
              
              event.preventDefault();
          }
        }}
        placeholder="Type something and press enter..."
        value={tags}
      />
    )
  }

export default Dashboard