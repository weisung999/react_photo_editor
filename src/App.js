import React, { useState } from 'react';
import './App.css';
import Slider from './Slider';
import SidebarItem from './SidebarItem';


const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const selectedOption = options[selectedOptionIndex]

  // 呼叫setOptions用prevOptions當成參數找出:沒改的返回，並更正target.value
  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
  } 

  function getImageStyle() {
    const filters = options.map(option => (
      `${option.property}(${option.value}${option.unit})`
    ))   // 先生成字串: property(value,unit)

    return { filter: filters.join('')} 
    //filter屬於CSS(DevTools-Elements-Styles-Filter),加入字串
  }
  

  return (
    <div className="container">
      <div className="main-image" style={getImageStyle()} />
      <div className="sidebar">
        {options.map((option, index) => (
          <SidebarItem
          key={index}
          name={option.name}
          active={index === selectedOptionIndex}
          handleClick={() => setSelectedOptionIndex(index)}
        />
        ))}      
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  );
}

export default App;
