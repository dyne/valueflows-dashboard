import React, {useState} from 'react';
 import styled from 'styled-components'
import {Box, Flex, Button, Text, Image, Heading} from 'rebass'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { Label, Input, Textarea } from '@rebass/forms'
import { EventsList } from './events-list';
import {CREATE_ECONOMIC_EVENT, CREATE_INTENT} from './graphql/mutations'
import {  useMutation } from '@apollo/react-hooks';



const Title = styled(Text)`
  font-size: 16px;
  letter-spacing: 1px;
  color: rgb(101, 119, 134);
`

const WrapResourceQuantityUnit = styled(Select)`
  flex: 1;
`

const Note = styled(Text)`
  color: #2e2e2e;
  font-weight: 300;
`


const Dashboard = ({data, intents}) => {
  const [action, setAction] = useState('')
  const [note, setNote] = useState('')
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
    { value: 'work', label: 'Work' },
    { value: 'use', label: 'Use' },
    { value: 'offer', label: 'Offer' },
    { value: 'request', label: 'Request' },
  ]
  const units = [{value: 'each', label: 'Each'},
                 {value: 'hour', label: 'Hour'},
                 {value: 'kilo', label: 'Kilo'}]
  
  const [createEconomicEvent, {economicData}] = useMutation(CREATE_ECONOMIC_EVENT, {refetchQueries: ["allEconomicEvents"]})  
  const [createIntent, {intentData}] = useMutation(CREATE_INTENT, {refetchQueries: ["allEconomicEvents"]})  
  return (
    <Box sx={{
      width: "900px",
      margin: "0 auto", 
      marginTop: '20px'}}>
      <Flex>
      <Box sx={{width: "640px", 
        background: "white",
        padding: "4px",
        borderRadius: "8px",
        marginBottom: "20px"}}>
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
            <Box sx={{width: "300px"}} mt={2} ml={3}>
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
              canCreate
              resource={toResource}
              setResource={setToResource}
              options={data.allEconomicResources.map(r => ({value: r.name, label: r.name}))}
            />
          </Box> : 
          action.value === 'produce' ?
          <Box mt={2} mb={2}>
            <SelectResource
              canCreate
              resource={resource}
              setResource={setResource}
              options={data.allEconomicResources.map(r => ({value: r.name, label: r.name}))}
            />
          </Box> :
          action.value === 'consume' || action.value === 'use'  ?
          <Box mt={2} mb={2}>
          <SelectResource
            resource={resource}
            setResource={setResource}
            options={data.allEconomicResources.map(r => ({value: r.name, label: r.name}))}
          />
          </Box> : null
          }
          {action.value === 'offer' || action.value === 'request'  ?
            null :
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
            </Flex>}
          
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
          {action.value === 'offer' || action.value === 'request'  ?
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
          : null
          }
          {action.value === 'work' || action.value === 'offer' || action.value === 'request'  ?
            <Box mt={2} p={2} sx={{borderRadius: "6px", bg: "#dadada"}}>
              <Label sx={{fontSize: '13px'}} htmlFor='note'>Add a description</Label>
              <Textarea
                sx={{borderRadius: '4px', bg: "#fff", border: '1px solid hsl(0,0%,80%)'}}
                id='note'
                name='note'
                onChange={e => setNote(e.target.value)}
              />
              <Label sx={{fontSize: '13px'}} htmlFor='tags'>Add some tags</Label>
              <SelectTag tags={tags} inputValue={inputValue} setTags={setTags} setInputValue={setInputValue}/>
            </Box> : null
          }

          {action.value === 'offer' || action.value === 'request' ?
          <Button sx={{
            width: "100%",
            background: "#267e63",
            height: "40px"
          }} 
          mt={3}
          onClick={e => {
            e.preventDefault();
            let atLocation = null
            let provider
            let receiver
            if (action.value === 'offer') {
              provider = 'Jo Freeman'
            }
            if (action.value === 'request') {
              receiver = 'Jo Freeman'
            }
            if (lgn !== '' && lat !== '') {
              atLocation = lgn + ',' + lat
            } 
            const variables = {
              provider: provider,
              receiver: receiver,
              description: note,
              action: action.value,
              availableQuantityHasUnit: unit,
              availableQuantityHasNumericalValue: parseFloat(quantity),
              atLocation: atLocation,
              resourceConformsTo: tags.map(tag => tag.value).join(',')
            }
            createIntent({ variables: variables });
            setAction('')
            setNote('')
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
          >Submit</Button> : 
          <Button sx={{
            width: "100%",
            background: "#267e63",
            height: "40px"
          }} 
          mt={3}
          onClick={e => {
            e.preventDefault();
            let currentLocation = null
            if (lgn !== '' && lat !== '') {
              currentLocation = lgn + ',' + lat
            } 
            const variables = {
              note: note,
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
            setNote('')
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
          >Submit</Button>
          }
          </>
          }
        </Box>
          </Box>
          </Flex>
        
        <Title mt={4} pb={2} mb={2} pl={3} sx={{fontWeight: 800, borderBottom: "1px solid #dadada"}}>Recent activities</Title>
        <EventsList />
      </Box>
      <Box p={2} ml={2} sx={{bg: "white", borderRadius: "8px", width: "240px", marginBottom: "20px"}}>
      <Title pb={2} mt={1} mb={2} sx={{fontWeight: 800, borderBottom: "1px solid #dadada"}}>Your offers & requests</Title>
        {intents.allIntents.map((intent, i) => (
          <Box key={i} mt={2} pb={2} sx={{borderBottom: "1px solid #dadada"}}>
            <Text sx={{fontSize: "12px",
                        fontWeight: 800,
                        textTransform:" uppercase"}}>{intent.action}</Text>
            <Note>{intent.description}</Note>
            <Box mt={2}>{intent.resourceConformsTo
                    .split(",")
                    .map((tag, i) => (<Box
                      key={i}
                      mr={1}
                      sx={{
                        display: 'inline-block',
                        color: 'white',
                        bg: '#9f75cf',
                        px: 2,
                        py: 1,
                        fontSize: "14px",
                        borderRadius: 9999,
                      }}>
                      #{tag}
                    </Box>))}
                  </Box>
          </Box>
        ))}
      </Box>
      </Flex>
    </Box>
    );
  }





const SelectResource = ({resource, setResource, options, canCreate}) => {
    
    return (
      canCreate ? 
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
      : <Box>
      <Select
        isClearable
        placeholder="Select a resource..."
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