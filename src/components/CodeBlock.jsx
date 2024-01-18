import React, { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import glsl from "highlight.js/lib/languages/glsl";
import SyntaxHighlighter from 'react-syntax-highlighter';

import reactHighlight from "react-highlight";

import './CodeBlock.css'
import "highlight.js/styles/monokai.css";
import ReactHighlight from "react-highlight";



export const CodeBlock = (props) => {
    const {language, code} = props
    useEffect(()=>{
        hljs.highlightAll()
    }, [props.code])
    return(
        // <pre>
        //     <code className={language}>
        //         {code}
        //     </code>
        // </pre>

        <ReactHighlight className={language}>{code}</ReactHighlight>

    )
}