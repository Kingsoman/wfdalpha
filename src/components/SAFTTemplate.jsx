import React, { useState, useRef, useEffect } from 'react';
import { Flex,  VStack } from "@chakra-ui/react";
import { toast } from 'react-toastify';

import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useStore } from '../store';
import { 
  FetchData,
  GetOneProject,
  errorOption
 } from './Util';
import {

  WasmAPI 
} from '@terra-money/terra.js'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


export default function PDFTemplate({presale, project_id})
{
  const {state, dispatch} = useStore();
  const isWeFund = state.wefundID == project_id;
  const [src, setSrc] = useState("/PDFTemplate_presale.pdf");

  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  async function fetchData(){
    let {projectData, communityData, configData} = await FetchData(api, state, dispatch);
console.log(projectData);
    const oneprojectData = GetOneProject(projectData, project_id);
    if(oneprojectData == ''){
      toast("Can't fetch project data", errorOption);
      return '';
    }
// console.log(oneprojectData.project_saft);
    if(!isWeFund)
      setSrc(state.request + "/download_docx?filename=" + oneprojectData.project_saft);
  }

  useEffect( () => {
    if(!isWeFund)
      fetchData();
    else{
      setSrc(presale === true? "/PDFTemplate_presale.pdf" : "/PDFTemplate.pdf");
    }
  }, [])

console.log(src);
  function onDocumentLoadSuccess(){
    // document.getElementById('loading').innerHTML='';
  }
  const PDFViewer = ({scale}) => {
    return(
      <div>
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} scale={scale}/>
            </Document>
          </div>
          <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={2} scale={scale} />
            </Document>
          </div>
          <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={3} scale={scale} />
            </Document>
          </div>
          <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={4} scale={scale} />
            </Document>
          </div>
          <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={5} scale={scale} />
            </Document>
          </div>
          <div style={{display:'flex', justifyContent:'center', marginTop:"20px"}}>
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={6} scale={scale} />
            </Document>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Flex direction='column'>
      <VStack 
        display={{base:'none', md:'none', lg:'block'}} 
        maxW={{base:'0px',md:'0px',lg:'2560px'}} 
        maxH={{base:'0px',md:'0px',lg:'9999px'}}
        mb = {'50px'}
      >
        {isWeFund &&
          <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
            <PDFViewer scale="1.3"/>
          </div>
        }
        {!isWeFund &&
          <Flex w='800px'>
            <iframe 
              width="100%" 
              height="1200" 
              frameborder="0" 
              src={`https://docs.google.com/gview?url=${src}&embedded=true`}
            />
          </Flex>
        }
      </VStack>
      <VStack 
        display={{base:'block', md:'block', lg:'none'}} 
        maxW='500px'
        mb = {'50px'}
      >
        {isWeFund &&
          <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
            <PDFViewer scale="0.6"/>
          </div>
        }
        {!isWeFund &&
          <Flex w='400px'>
            <iframe 
              width="100%" 
              height="1200" 
              frameborder="0" 
              src={`https://docs.google.com/gview?url=${src}&embedded=true`}
            />
          </Flex>
        }
      </VStack>      
    </Flex>
  )
}