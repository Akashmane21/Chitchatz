import React from "react"
import ContentLoader from "react-content-loader"

const Chatloader = () => (
  <ContentLoader 
  speed={2}
  width={476}
  height={150}
  viewBox="0 0 476 135"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
   >
  <rect x="64" y="3" rx="3" ry="3" width="88" height="15" /> 
  <rect x="68" y="29" rx="3" ry="3" width="51" height="10" /> 
  <circle cx="25" cy="25" r="25" /> 
  <circle cx="25" cy="109" r="20" /> 
  <rect x="9" y="70" rx="3" ry="3" width="88" height="8" /> 
  <circle cx="53" cy="109" r="20" /> 
  <circle cx="83" cy="109" r="20" /> 
  <rect x="230" y="44" rx="3" ry="3" width="63" height="6" />
</ContentLoader>
)


const picloader = () => (
  <ContentLoader 
    speed={2}
    width={50}
    height={50}
    viewBox="0 0 50 50"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="30" cy="26" r="20" /> 
    <circle cx="25" cy="109" r="20" /> 
    <circle cx="53" cy="109" r="20" /> 
    <circle cx="83" cy="109" r="20" />
  </ContentLoader>
)

export  {Chatloader,picloader}