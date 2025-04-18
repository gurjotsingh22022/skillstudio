"use client"

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
  );
  const Markdown = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default.Markdown), {
    ssr: false,
  });
import React, { useState } from 'react'


interface propsType {
    value: string
    editor?: boolean;
    onChange?: (e: any | null) => void;
}

const MDFormator = ({value, editor=true, onChange}: propsType) => {
    const [text, setText] = useState<any>(value)
  return (
    <>
    <div data-color-mode="light" id="md-format">
      {
        editor?
        <MDEditor
          data-color-mode="light"
          value={text}
          onChange={(e)=> {setText(e as string); 
            if(onChange) onChange(e as string)}}
          style={{ fontFamily: "Inter, Inter Fallback", whiteSpace: 'pre-wrap' , margin:0}}
        />:
        <>
        {
        Markdown?
        <Markdown source={value} style={{ whiteSpace: 'pre-wrap', margin:0 , fontFamily: "Inter, Inter Fallback" }} />:null
      }
        </>
      }

      
      
    </div>
    
    </>
    
  )
}

export default MDFormator