import React, {useState} from 'react';
 import styled from 'styled-components'
import {Box, Flex, Button, Text} from 'rebass'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { Label, Input } from '@rebass/forms'
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
  ) {
    createEconomicEvent(event: {
      action: $action,
      resourceQuantityHasUnit: $resourceQuantityHasUnit,
      resourceQuantityHasNumericalValue: $resourceQuantityHasNumericalValue,
      resourceInventoriedAs: $resourceInventoriedAs,
      toResourceInventoriedAs: $toResourceInventoriedAs,
      currentLocation: $currentLocation
    }) {
      economicEventId
    }
  }
`;
const Title = styled(Text)`
  font-size: 16px;
  letter-spacing: 1px;
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
    
      <Flex 
        as="form"
        onSubmit={e => {
          e.preventDefault();
          let currentLocation = null
          if (lgn !== '' && lat !== '') {
            currentLocation = lgn + ',' + lat
          } 
          console.log(currentLocation)
          const variables = {
            action: action.value,
            resourceQuantityHasUnit: unit,
            resourceQuantityHasNumericalValue: parseFloat(quantity),
            resourceInventoriedAs: resource.value,
            toResourceInventoriedAs: toResource.value,
            currentLocation: currentLocation
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
          return null
        }}
        sx={{width: "800px", margin: "0 auto", marginTop: '20px'}}>
      <Box sx={{width: "300px"}} mr={4}>
        <Title mb={3}>Create a new event</Title>
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
          <Box mt={2}><SelectTag tags={tags} inputValue={inputValue} setTags={setTags} setInputValue={setInputValue}/></Box>
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
      <Box sx={{flex: 1}}>
        <Title mb={3}>Recent economic activities</Title>
        <EventsList />
      </Box>
      </Flex>
   
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