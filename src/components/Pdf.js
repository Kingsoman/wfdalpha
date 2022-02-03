import React, { useState, useRef, useEffect } from 'react';

import {chakra, Box, Flex, Text, VStack, Image, Img
} from "@chakra-ui/react";

import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useStore } from '../store';
import DocViewer from './Doc'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const MyInput = (props) => {
  const [cover, setCover] = useState(true);
  const inputRef = useRef();

  useEffect(()=>{
      if(typeof inputRef.current != 'undefined')
        inputRef.current.focus();
  },[cover]);
  return(
    <div style={{diplay:'flex', flexDirection:'column', height:'50px', width:props.width,
    position:'relative', left:props.left, top:props.top, zIndex:'99'}}>
      <div style={{height:'14px'}}>
        {cover && 
          <div onClick={()=>{setCover(false); }} style={{display:'flex', justifyContent:'center',marginTop:'8px', fontSize:'8px', color:'white',backgroundColor:'rgb(24 99 124)', width:'100%', alignItem:'center'}}><div>Click</div></div>
        }
        {!cover && 
        <input ref={inputRef} type="text" value={props.value} onChange={props.onChange} 
        style={{width:'100%', height:'100%', backgroundColor:'rgb(109 209 243)', border:'0px', fontSize:props.fontsize}}/>
        }
      </div>
    </div>
  )
}

const dt = new Date();
const [month, day, year] = [dt.getMonth(), dt.getDate(), dt.getFullYear()];

export default function PDFTemplate(presale, project_id)
{
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(day+"/"+(month+1)%12+"/"+year);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  
  const [cover, setCover] = useState(true);
  const canvasRef = useRef({});
  const {state, dispatch} = useStore();

  // const PDFTEMPLATE = state.wefundID == project_id?(presale.presale === true? "/PDFTemplate_presale.pdf" : "/PDFTemplate.pdf"): "/DOCXTemplate.pdf";

  const PDFTEMPLATE = "/DOCXTemplate.pdf";
console.log(PDFTEMPLATE);
console.log(presale);

  function onDocumentLoadSuccess(){
    // document.getElementById('loading').innerHTML='';
  }
  
  async function confirm(){
    if(typeof document !== 'undefined'){
      if(typeof canvasRef.current === 'undefined' || 
      amount ==='' || date === '' || name === '' || title === '' || email === '')
      {
        // document.getElementById('loading').innerHTML='<h6>Please fill all fields!</h6>'
        return false;
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          "Amount": amount,
          "Date": date,
          "Name": name,
          "Title": title,
          'Email': email,
          "Sign":canvasRef.current.toDataURL(),
        }),
      };
      // console.log(amount)
      // console.log(date);
      // console.log(name);
      // console.log(title);
      // console.log(email);
      // console.log(canvasRef.current.toDataURL());

      fetch('http://localhost:3001/pdfmake', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("from server:");
        console.log(data);
        document.getElementById('loading').innerHTML=`
        <div>
        <h5>Sent success!</h5>
        <h6><a href="./PDF/${data.data}">Click here to see your PDF!</a></h6>
        `
      })
      .catch((e) =>{
        console.log("Error:"+e);
      })
    }
  }

  return (
    <Flex direction='column'>
      <VStack 
      display={{base:'none', md:'none', lg:'block'}} 
      maxW={{base:'0px',md:'0px',lg:'2560px'}} 
      maxH={{base:'0px',md:'0px',lg:'9999px'}}
      >
      <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
        <DocViewer source="https://localhost:3000/1.doc" />
      </div>
      </VStack>
      <VStack 
        display={{base:'block', md:'block', lg:'none'}} 
        maxW='500px'
      >
            <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
        <DocViewer source="https://localhost:3000/1.doc" />
      </div>
      </VStack>      
    </Flex>
  )
}