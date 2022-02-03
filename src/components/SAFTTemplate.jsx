import React, { useState, useRef, useEffect } from 'react';

import {chakra, Box, Flex, Text, VStack, Image, Img
} from "@chakra-ui/react";

import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useStore } from '../store';
import DocViewer from './Doc'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


export default function PDFTemplate({presale, project_id})
{
  const {state, dispatch} = useStore();
  const isWeFund = state.wefundID == project_id;

  const src = isWeFund?(presale.presale === true? "/PDFTemplate_presale.pdf" : "/PDFTemplate.pdf"): state.request + "/download?filename=DOCXTemplate.docx";

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
              height="600" 
              frameborder="0" 
              src={`https://docs.google.com/gview?url=${src}&embedded=true`}
            />
          </Flex>
        }
      </VStack>
      <VStack 
        display={{base:'block', md:'block', lg:'none'}} 
        maxW='500px'
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
              height="600" 
              frameborder="0" 
              src={`https://docs.google.com/gview?url=${src}&embedded=true`}
            />
          </Flex>
        }
      </VStack>      
    </Flex>
  )
}